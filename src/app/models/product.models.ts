import { Category } from "./category.model";


/* Es una buena practica hacer el tipado de los datos que recibimos, en este caso los productos */

export interface Product {
    id: string;
    title: String;
    price: number;
    images: String[];
    description: String;
    category: Category
}

/**Para crear producto debemos crear una nueva interface,
 * Una interfaz extendida permite reutilizar una interfaz existente y el omit para omitir ciertos parametros de esa categoria
 * Por ejem aqui queremos omitir solo el id y la categoria lo dem[as queda igual, exeptuando un nuevo parametro el categoryid**/
export interface CreareProductDTO extends Omit<Product, 'id' | 'category'> {
    categoryId: number;
}
/**El metodo partial hace que todos los atributos sean opcionales, es decir le coloca un ? a todos los atributos**/
export interface updateProductDTO extends Partial<CreareProductDTO>{}
