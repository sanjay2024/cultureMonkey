import { JSX } from "react";
import styles from "./card.module.css";
import RenderWhen from "../../common/HOC/RenderWhen";
import { FormData } from "../../types/profile";

interface CardProps {
  data: FormData;
}

const Card = ({ data }: CardProps): JSX.Element => {
  return (
    <div className={styles.card}>
      <img
        src={data.profileImage}
        alt="profilePic"
        className={styles.cardAvatar}
      />
      <h1 className={styles.cardName}>{data.username}</h1>
      <div className={styles.cardMeta}>
        <div className={styles.cardMetaPersonal}>
          <RenderWhen isTrue={Boolean(data.location)}>
            <span>{data.location}</span>
          </RenderWhen>
        </div>
      </div>
      <RenderWhen isTrue={Boolean(data.bio)}>
        <p className={styles.cardDescription}>{data.bio}</p>
      </RenderWhen>
      <div className={styles.cardNetwork}>
        <>
          <a href={data.profileUrl}>
            <img src="https://secure.gravatar.com/icons/gravatar.svg" />
          </a>
          <RenderWhen isTrue={Boolean(data.socialLinks)}>
            {(data?.socialLinks || []).map((acc) => (
              <a key={acc.service_label} href={acc.url}>
                <img src={acc.service_icon} alt={acc.service_label} />
              </a>
            ))}
          </RenderWhen>
        </>
      </div>
    </div>
  );
};

export default Card;
