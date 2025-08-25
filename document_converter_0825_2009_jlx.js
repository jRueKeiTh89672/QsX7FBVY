// 代码生成时间: 2025-08-25 20:09:29
 * It is designed to be easy to understand, maintain, and extend.
 *
 * Features:
 * - Error handling
 * - Comments and documentation
 * - Adherence to JavaScript best practices
 * - Maintainability and scalability
 */

// Import necessary Gatsby APIs
const { graphql, Link } = require("gatsby");

// Define supported formats
const SUPPORTED_FORMATS = ['docx', 'pdf', 'html'];

// Define a function to convert documents
async function convertDocument(sourcePath, targetFormat) {
  // Check if the target format is supported
  if (!SUPPORTED_FORMATS.includes(targetFormat)) {
    throw new Error(`Unsupported format: ${targetFormat}`);
  }

  // Placeholder for the actual conversion logic
  // This would likely involve calling an external service or library
  try {
    // Simulate a conversion process
    console.log(`Converting document at ${sourcePath} to ${targetFormat}...`);
    // Assume conversion is successful
    console.log(`Conversion to ${targetFormat} completed successfully!`);
  } catch (error) {
    // Handle any errors that occur during conversion
    console.error(`Error converting document: ${error.message}`);
    throw error;
  }
}

// Define a Gatsby page that will handle the conversion
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // Check if the page is the document converter page
  if (page.path === '/document-converter') {
    // Create a new page with the same path and template
    createPage({
      ...page,
      component: require.resolve(`./src/templates/documentConverterTemplate.js`),
    });
  }
};

// Document Converter Template
const documentConverterTemplate = graphql(
  """
    query DocumentConverterQuery {
      allFile {
        edges {
          node {
            relativePath
            prettySize
            extension
          }
        }
      }
    }
  """
)(
  (props) => {
    const { data } = props;
    const { allFile } = data;
    const files = allFile.edges.map(edge => edge.node);

    return (
      <div>
        <h1>Document Converter</h1>
        {files.map(file => (
          <div key={file.relativePath}>
            <p>{file.relativePath} - {file.prettySize} - {file.extension}</p>
            <button onClick={() => convertDocument(file.relativePath, 'pdf')}>
              Convert to PDF
            </button>
          </div>
        ))}
      </div>
    );
  }
);