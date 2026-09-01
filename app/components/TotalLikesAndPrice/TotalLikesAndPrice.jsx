import styles from "./TotalLikesAndPrice.module.css";

export default function TotalLikesAndPrice({ medias, price }) {
  const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);

  return (
    <div className={styles.totalLikesAndPrice}>
      <p className={styles.totalLikes}>
        {totalLikes} <span className={styles.likeIcon}>likes</span>
      </p>
      <p>{price}€ / jour</p>
    </div>
  );
}
