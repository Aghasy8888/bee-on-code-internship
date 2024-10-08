import Image from 'next/image';
import { FEMALE, MALE } from '@/constants';
import { femaleIcon, femaleIconActive, maleIcon, maleIconActive } from '@/public/assets';

import styles from './GenderSelection.module.scss';

interface IGenderSelectionProps {
    setGender: TSetString;
    gender: string;
}

const GenderSelection = ({ gender, setGender }: IGenderSelectionProps) => {
  return (
    <div className={styles.genderSelection}>
          <button type='button' onClick={() => setGender(FEMALE)}>
            <Image
              alt="maleIcon"
              src={gender === FEMALE ? femaleIconActive : femaleIcon}
              width={24}
              height={24}
            />
            <p>женский</p>
          </button>
          <button type='button' onClick={() => setGender(MALE)}>
            <Image
              alt="maleIcon"
              src={gender === MALE ? maleIconActive : maleIcon}
              width={24}
              height={24}
            />
            <p>мужской</p>
          </button>
        </div>
  )
}

export default GenderSelection
