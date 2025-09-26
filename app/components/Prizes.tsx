import styles from './Prizes.module.css';

export default function Prizes() {
  const prizes = [
    {
      place: '2',
      suffix: 'nd',
      title: 'Premium Package',
      value: 'da',
      items: [
        
      ],
      colorClass: styles.secondPlace,
      heightClass: styles.mediumHeight,
      order: styles.orderFirst
    },
    {
      place: '1',
      suffix: 'st',
      title: 'Grand Prize',
      value: '10.000 Da',
      items: [
        
        
      ],
      colorClass: styles.firstPlace,
      heightClass: styles.tallHeight,
      order: styles.orderSecond,
      featured: true
    },
    {
      place: '3',
      suffix: 'rd',
      title: 'Starter Package',
      value: 'da',
      items: [
       
      ],
      colorClass: styles.thirdPlace,
      heightClass: styles.shortHeight,
      order: styles.orderThird
    }
  ];

  return (
    <section id="prizes" className={styles.prizesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Amazing Prizes Await
          </h2>
          <p className={styles.description}>
            We're giving away over $8,500 worth of prizes to celebrate the launch of Modyon platform!
          </p>
        </div>
        
        {/* Podium Display */}
        <div className={styles.podiumContainer}>
          {prizes.map((prize, index) => (
            <div key={index} className={`${styles.prizeItem} ${prize.order}`}>
              {/* Podium Block */}
              <div className={`${styles.podiumBlock} ${prize.heightClass} ${prize.colorClass}`}>
                <div className={styles.podiumContent}>
                  <div className={styles.placeNumber}>{prize.place}</div>
                  <div className={styles.placeSuffix}>{prize.suffix}</div>
                </div>
                
                {/* Speech bubble tail */}
                <div className={styles.bubbleTail}>
                  <div className={`${styles.tailShape} ${prize.colorClass}`}></div>
                </div>
              </div>
              
              {/* Prize Details Card */}
              <div className={styles.prizeCard}>
                <h3 className={styles.prizeTitle}>{prize.title}</h3>
                <div className={styles.prizeValue}>{prize.value}</div>
                <ul className={styles.prizeItems}>
                  {prize.items.map((item, itemIndex) => (
                    <li key={itemIndex} className={styles.prizeItem}>
                      <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                
                {prize.featured && (
                  <div className={styles.grandPrizeBadge}>
                    <div className={styles.badgeContent}>
                      🏆 GRAND PRIZE
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
      </div>
    </section>
  );
}