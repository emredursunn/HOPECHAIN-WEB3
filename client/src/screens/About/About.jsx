// src/pages/About.js
import React from "react";
import "./About.css"; // CSS dosyasını içe aktarın

const About = () => {
  return (
    <div className="about-page">
      <h1>HOPECHAIN Hakkında</h1>
      <section>
        <h2>Sitemizin Amacı</h2>
        <p>
          HOPECHAIN, blockchain teknolojisini kullanarak yardım projelerini daha şeffaf ve güvenilir hale getirmeyi amaçlayan bir platformdur. Yardım ve bağış işlemlerini, merkeziyetsiz bir yapıda ve yüksek güvenlik standartlarıyla gerçekleştirmeyi hedefliyoruz.
        </p>
      </section>
      <section>
        <h2>Blockchain Teknolojisi Neden Kullanılıyor?</h2>
        <p>
          Blockchain teknolojisi, işlemlerin şeffaf ve değiştirilemez bir şekilde kayıt altına alınmasını sağlar. Bu, bağışların tam olarak nereye gittiğini görmenizi ve işlemlerin doğru bir şekilde gerçekleştirildiğinden emin olmanızı sağlar. Ayrıca, akıllı sözleşmeler sayesinde otomatik ve güvenli işlemler gerçekleştirilebilir.
        </p>
      </section>
      <section>
        <h2>Cross-Chain Transferler</h2>
        <p>
          HOPECHAIN, farklı blockchain ağları arasında bağış ve yardım transferlerini mümkün kılar. Bu, kullanıcıların farklı ağlarda bulunan varlıklarını birleştirebilmelerini ve diğer blockchain ağlarına transfer edebilmelerini sağlar. Örneğin, Ethereum'dan Polygon'a transfer yapabilir ve tüm işlemleri güvenli bir şekilde gerçekleştirebilirsiniz.
        </p>
      </section>
      <section>
        <h2>Amacımız ve Gelecek Planlarımız</h2>
        <p>
          Amacımız, global yardım projelerini desteklemek ve blockchain teknolojisi aracılığıyla daha fazla şeffaflık ve güvenlik sağlamaktır. Gelecek planlarımız arasında daha fazla blockchain ağı desteği eklemek, kullanıcı deneyimini iyileştirmek ve yardım projelerinin daha geniş bir kitleye ulaşmasını sağlamak yer almaktadır.
        </p>
      </section>
    </div>
  );
};

export default About;
