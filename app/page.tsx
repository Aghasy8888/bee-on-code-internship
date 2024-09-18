import { CategoryPanel, Products } from '@/components';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <CategoryPanel />
      <Products /> 
    </div>
  );
}
