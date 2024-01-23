//* Import everything needed to use the `useQuery` hook
import { useQuery, gql } from "@apollo/client";

const getProductsGPL = gql`
  query GetProducts {
    products {
      Name
      Description
      Price
      SKU
    }
  }
`;
function DisplayProducts() {
  //* the useQuery hook will automatically executes the query and return a result object
  const { loading, error, data } = useQuery(getProductsGPL, {
    errorPolicy: "all",
  });

  //* Apollo Client automatically tracks a query's loading and error states, which are
  //* reflected in the loading and error properties.
  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <div>
        <p>Error fetching products:</p>
        <pre>
          {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </pre>
      </div>
    );
  }

  const products = data?.products || [];

  //* When the result of your query comes back, it's attached to the data property.
  return (
    <div>
      <h2>Product List</h2>
      {products.length > 0 ? (
        <ul style={{ listStyle: "none" }}>
          {products.map((product, index) => (
            <li key={index}>
              <h3>{product.Name}</h3>
              <p>{product.Description}</p>
              <p>Price: ${product.Price}</p>
              <p>SKU: {product.SKU}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default DisplayProducts;
