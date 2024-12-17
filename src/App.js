import { useState } from "react";
import { useDeleteProductMutation, useAddProductMutation, useGetGoodsQuery } from "./redux";

function App() {
	const [count, setCount] = useState("");
	const [newProduct, setNewProduct] = useState("");
	const { data = [], isLoading } = useGetGoodsQuery(count);
	const [addProduct, { isError }] = useAddProductMutation();
	const [deletrProduct] = useDeleteProductMutation();
	if (isLoading) return <h1>IS Loading...</h1>;
	const handleAddProduct = async () => {
		if (newProduct) {
			await addProduct({ name: newProduct }).unwrap();
			setNewProduct("");
		}
	};
	const handleDeleteProduct = async (id) => {
		await deletrProduct(id).unwrap();
	};
	return (
		<div className="App">
			<input value={newProduct} onChange={(e) => setNewProduct(e.target.value)} />
			<button onClick={handleAddProduct}>Add product</button>
			<select value={count} onChange={(e) => setCount(e.target.value)}>
				<option value={""}>all</option>
				<option value={"1"}>1</option>
				<option value={"2"}>2</option>
				<option value={"3"}>3</option>
			</select>
			<ul>
				{data.map((el) => (
					<li key={el.id} onClick={(e) => handleDeleteProduct(el.id)}>
						{el.name}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
