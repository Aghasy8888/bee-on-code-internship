import { useAppSelector } from '@/redux/hooks';
import SingleProduct from '../SingleProduct';
import {
  selectActiveCategory,
  selectActiveSubCategory,
  selectProducts,
} from '@/redux/features/generalSlice';

const ProductCards = () => {
  const products = useAppSelector(selectProducts);
  const activeCategory = useAppSelector(selectActiveCategory);
  const activeSubCategory = useAppSelector(selectActiveSubCategory);
  const parent = activeSubCategory
    ? `${activeCategory?.name}->${activeSubCategory}`
    : activeCategory?.name;
  const filteredProducts = products.filter(
    (p) =>
      p.parent === parent ||
      (p.parent.split('->')[0] === activeCategory?.name &&
        activeSubCategory === activeCategory.name)
  );

  return (
    <>
      {filteredProducts.map((product) => (
        <SingleProduct product={product} key={product.articleNumber} />
      ))}
    </>
  );
};

export default ProductCards;
