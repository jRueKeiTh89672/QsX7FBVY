// 代码生成时间: 2025-09-06 02:05:13
 * Gatsby Integration Tests
 * This script sets up a test environment using Gatsby's API to run integration tests.
 * It demonstrates how to write a basic integration test for a Gatsby site.
 */

// Import necessary Gatsby and testing libraries
const { graphql } = require('gatsby');
const { render } = require('@testing-library/react');
const { toMatchSnapshot } = require('jest-snapshot');
expect.extend({ toMatchSnapshot });

// Define a basic test for a Gatsby page
describe('Gatsby Page', () => {
  it('renders without crashing', async () => {
    const { getByText } = render(<div>Hello World</div>);
    await expect(getByText('Hello World')).resolves.toBeDefined();
  });

  it('matches snapshot', async () => {
    const { asFragment } = render(<div>Hello World</div>);
    expect(asFragment()).toMatchSnapshot();
  });
});

// Define a GraphQL query test
describe('GraphQL Query', () => {
  it('fetches data correctly', async () => {
    const query = `
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
    const result = await graphql(query);
    await expect(result).resolves.toHaveProperty('data.site.siteMetadata.title');
  });
});