import styles from './Title.module.css';

const Title = ({ name }: { name: string }) => {
  return <h4 className={`${styles.title} text-white text-center`}>{name}</h4>;
};

export default Title;
