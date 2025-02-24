import CreateProduct from "./components/CreateProduct";
import ProductList from "./components/ProductList";

export default function App() {
    return (
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4">Product Management</h1>
      <CreateProduct/>
      <ProductList /> 
    </div>
    );
}

