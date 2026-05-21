// Pure WebAssembly version aligned with stable 0.22.x layout
const Parser = require('web-tree-sitter');

let isInitialized = false;
let cLanguage;

async function initParser() {
    if (!isInitialized) {
        await Parser.init();
        const cWasmPath = require.resolve('tree-sitter-wasms/out/tree-sitter-c.wasm');
        cLanguage = await Parser.Language.load(cWasmPath);
        isInitialized = true;
    }
}

const analyzeAST = async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "No C code provided." });

    try {
        await initParser();

        const parser = new Parser();
        parser.setLanguage(cLanguage);

        const tree = parser.parse(code);
        const vulnerabilities = [];

        function traverse(node) {
            // FIX: Match BOTH standard declarations AND struct field declarations
            if (node.type === 'declaration' || node.type === 'field_declaration') {
                const typeNode = node.childForFieldName('type');
                if (typeNode) {
                    const typeText = typeNode.text;
                    // Detect 32-bit legacy types INCLUDING stdint.h types
                    if (typeText === 'int' || typeText === 'long' || typeText === 'time_t' || typeText === 'int32_t' || typeText === 'uint32_t') {
                        vulnerabilities.push({
                            id: Math.random().toString(36).substring(2, 9),
                            line: node.startPosition.row + 1, // Monaco 1-based indexing
                            column: node.startPosition.column + 1,
                            type: typeText,
                            codeSnippet: node.text
                        });
                    }
                }
            }
            
            // Keep walking down the tree branches
            for (let i = 0; i < node.childCount; i++) {
                traverse(node.child(i));
            }
        }

        traverse(tree.rootNode);
        res.json({ vulnerabilities });

    } catch (error) {
        console.error("WASM Parser Error:", error);
        res.status(500).json({ error: "Failed to parse code using WebAssembly." });
    }
};

module.exports = { analyzeAST };