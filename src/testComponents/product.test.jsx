import { render, screen } from "@testing-library/react";
import ProductPage from "../pages/product/ProductPage";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
//import LoginForm from "../pages/login/loginComponents/LoginForm";
test('testing prduct page', ()=>{
    render(<ProductPage/>)
    const productElement = screen.getByText('Product Page')
    expect(productElement).toBeInTheDocument()
})
// test('renders the product grid container', () => {
//   render(<ProductPage />);
//   const gridHeader = screen.getByText(/our products/i); 
//   expect(gridHeader).toBeInTheDocument();
// });
// test('renders the filter buttons for user selection', () => {
//   render(<ProductPage />);
//   const filterButton = screen.getByRole('button', { name: /filter/i });
//   expect(filterButton).toBeInTheDocument();
// });
