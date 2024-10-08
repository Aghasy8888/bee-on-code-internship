import Image from 'next/image';
import {
  femaleIcon,
  femaleIconActive,
  maleIcon,
  maleIconActive,
} from '@/public/assets';
import { FEMALE, MALE } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectGender, setGender } from '@/redux/features/helperSlice';

import styles from './GenderFilter.module.scss';

const GenderFilter = () => {
  const gender = useAppSelector(selectGender);
  const dispatch = useAppDispatch();
  const setGenderLocal = (gender: string) => {
    dispatch(setGender(gender));
  }

  return (
    <div className={styles.genderFilter}>
      <button onClick={() => setGenderLocal(FEMALE)} className={styles.female}>
        <Image
          alt="female"
          src={gender === FEMALE ? femaleIconActive : femaleIcon}
          width={18}
          height={18}
          priority
        />
      </button>
      <button onClick={() => setGenderLocal(MALE)} className={styles.male}>
        <Image
          alt="male"
          src={gender === MALE ? maleIconActive : maleIcon}
          width={18}
          height={18}
          priority
        />
      </button>
    </div>
  );
};

export default GenderFilter;
