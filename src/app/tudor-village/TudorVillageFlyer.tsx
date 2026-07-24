'use client'
import Image from 'next/image'

export default function TudorVillageFlyer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f8f5f0; font-family: 'Jost', sans-serif; font-weight: 300; color: #181816; }

        .page {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          background: #fff;
          display: flex;
          flex-direction: column;
        }

        /* Top green band */
        .top-band {
          background: #1B3828;
          padding: 10mm 14mm 8mm;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8mm;
        }

        .top-band-text { flex: 1; }

        .top-eyebrow {
          font-size: 8px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #c8a96e;
          margin-bottom: 2mm;
        }

        .top-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          font-weight: 300;
          color: #fff;
          line-height: 1.1;
        }

        .top-title em { font-style: italic; color: #c8a96e; }

        .top-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-style: italic;
          color: #fff8;
          margin-top: 2mm;
        }

        /* Photo */
        .photo-wrap {
          width: 38mm;
          height: 46mm;
          border-radius: 3mm;
          overflow: hidden;
          flex-shrink: 0;
          border: 2px solid #c8a96e44;
        }

        /* Body */
        .body { padding: 10mm 14mm; flex: 1; }

        /* Intro */
        .intro-row {
          display: flex;
          align-items: flex-start;
          gap: 8mm;
          margin-bottom: 8mm;
          padding-bottom: 8mm;
          border-bottom: 0.5px solid #c8a96e44;
        }

        .logo-wrap { flex-shrink: 0; }

        .intro-text { flex: 1; }

        .intro-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 400;
          color: #1B3828;
          margin-bottom: 1.5mm;
        }

        .intro-title {
          font-size: 8.5px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c8a96e;
          margin-bottom: 3mm;
        }

        .intro-bio {
          font-size: 11px;
          line-height: 1.8;
          color: #444;
        }

        /* Section */
        .section { margin-bottom: 7mm; }

        .section-heading {
          font-size: 7.5px;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #c8a96e;
          margin-bottom: 3mm;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .section-heading::after {
          content: '';
          flex: 1;
          height: 0.5px;
          background: #c8a96e44;
        }

        /* Services grid */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3mm;
        }

        .service-card {
          background: #faf8f3;
          border: 0.5px solid #c8a96e33;
          border-radius: 2.5mm;
          padding: 3.5mm 4mm;
        }

        .service-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 400;
          color: #1B3828;
          margin-bottom: 1mm;
        }

        .service-desc {
          font-size: 9.5px;
          color: #666;
          line-height: 1.6;
        }

        /* Blends note */
        .blends-note {
          background: #1B3828;
          border-radius: 2.5mm;
          padding: 4mm 5mm;
          margin-bottom: 7mm;
        }

        .blends-note p {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-style: italic;
          color: #fff;
          line-height: 1.7;
        }

        .blends-note span { color: #c8a96e; }

        /* Training */
        .training-row {
          display: flex;
          gap: 3mm;
          flex-wrap: wrap;
        }

        .training-pill {
          background: #f0e4cc;
          border: 0.5px solid #c8a96e55;
          border-radius: 100px;
          padding: 1.5mm 4mm;
          font-size: 9px;
          letter-spacing: 1px;
          color: #7a5c2e;
          text-transform: uppercase;
        }

        /* Price */
        .price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #faf8f3;
          border: 1px solid #c8a96e33;
          border-radius: 2.5mm;
          padding: 4mm 6mm;
          margin-bottom: 7mm;
        }

        .price-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #6b6b65;
        }

        .price-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 400;
          color: #1B3828;
        }

        .price-note {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          font-style: italic;
          color: #6b6b65;
        }

        /* Footer band */
        .footer-band {
          background: #1B3828;
          padding: 5mm 14mm;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-item {
          text-align: center;
        }

        .footer-label {
          font-size: 7px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c8a96e88;
          margin-bottom: 1mm;
        }

        .footer-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 12px;
          font-style: italic;
          color: #fff;
        }

        .footer-divider {
          width: 0.5px;
          height: 8mm;
          background: #c8a96e33;
        }

        @media print {
          html, body { background: #fff !important; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page { margin: 0; width: 100%; height: 297mm; overflow: hidden; break-after: avoid; }
          .no-print { display: none !important; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>

      {/* Print button */}
      <div className="no-print" style={{ textAlign: 'center', padding: '16px', background: '#f8f5f0', borderBottom: '1px solid #e8e4dc' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#6b6b65', marginBottom: '10px' }}>
          Tudor Village Lilydale — notice board flyer
        </p>
        <button
          onClick={() => window.print()}
          style={{
            background: '#1B3828', color: '#fff', border: 'none',
            padding: '10px 28px', borderRadius: '100px',
            fontFamily: 'sans-serif', fontSize: '11px',
            letterSpacing: '2px', textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Print flyer
        </button>
      </div>

      <div className="page">

        {/* Top band */}
        <div className="top-band">
          <div className="top-band-text">
            <p className="top-eyebrow">Tudor Village Lilydale &nbsp;·&nbsp; Every Friday</p>
            <h1 className="top-title">Massage &amp;<br /><em>Holistic Therapies</em></h1>
            <p className="top-tagline">Brought to you by Harmonized Therapies</p>
          </div>
          <div className="photo-wrap">
            <Image
              src="/Images/danielle-portrait.png"
              alt="Danielle Brierley"
              width={152}
              height={184}
              style={{ objectFit: 'cover', objectPosition: 'center top', width: '100%', height: '100%' }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="body">

          {/* Intro with logo */}
          <div className="intro-row">
            <div className="logo-wrap">
              <Image
                src="/Images/logo-submark.png"
                alt="Harmonized Therapies"
                width={72}
                height={88}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="intro-text">
              <p className="intro-name">Danielle Brierley</p>
              <p className="intro-title">Holistic Massage Therapist</p>
              <p className="intro-bio">
                Hi, I&apos;m Danielle — a holistic massage therapist who visits Tudor Village every Friday
                to bring you a little rest, relief, and care. I tailor every session to what your body
                needs most on the day, using beautiful oils and the right touch for you.
                Whether you&apos;re looking for deep relaxation or something more therapeutic,
                I&apos;m here to support your wellbeing.
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="section">
            <p className="section-heading">What I offer</p>
            <div className="services-grid">
              <div className="service-card">
                <p className="service-name">Relaxation Massage</p>
                <p className="service-desc">Full body or targeted — deeply calming and nurturing for body and mind.</p>
              </div>
              <div className="service-card">
                <p className="service-name">Deep Tissue &amp; Therapeutic</p>
                <p className="service-desc">For aches, tension, and areas that need a little more attention.</p>
              </div>
              <div className="service-card">
                <p className="service-name">Back, Legs &amp; Feet</p>
                <p className="service-desc">A favourite combination — great for circulation and tired legs.</p>
              </div>
              <div className="service-card">
                <p className="service-name">Head, Neck, Shoulders &amp; Face</p>
                <p className="service-desc">Melts away tension — wonderful for headaches and tight shoulders.</p>
              </div>
            </div>
          </div>

          {/* Blends note */}
          <div className="blends-note">
            <p>
              I use <span>beautiful aromatherapy blends</span> chosen for each person, along with
              <span> hot stones</span> and <span>cupping</span> where beneficial —
              always adapted to what feels right for you on the day.
            </p>
          </div>

          {/* Training */}
          <div className="section">
            <p className="section-heading">My training</p>
            <div className="training-row">
              <span className="training-pill">Relaxation &amp; Therapeutic Massage</span>
              <span className="training-pill">Hot Stone Therapy</span>
              <span className="training-pill">Cupping Therapy</span>
              <span className="training-pill">Oncology Massage</span>
              <span className="training-pill">Palliative Care Massage</span>
              <span className="training-pill">Community Care</span>
            </div>
          </div>

          {/* Price */}
          <div className="price-row">
            <div>
              <p className="price-label">Session price</p>
              <p className="price-note">1 hour · tailored to you</p>
            </div>
            <p className="price-amount">$85</p>
            <div style={{ textAlign: 'right' }}>
              <p className="price-label">To book</p>
              <p className="price-note">Sign up on the sheet &nbsp;·&nbsp; or call Danielle</p>
            </div>
          </div>

          {/* Extended session note */}
          <div style={{ textAlign: 'center', marginBottom: '2mm' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', fontStyle: 'italic', color: '#6b6b65' }}>
              1½ hour sessions also available — just let Danielle know when you book
            </p>
          </div>

        </div>

        {/* Footer band */}
        <div className="footer-band">
          <div className="footer-item">
            <p className="footer-label">Phone</p>
            <p className="footer-value">0411 267 676</p>
          </div>
          <div className="footer-divider" />
          <div className="footer-item">
            <p className="footer-label">Email</p>
            <p className="footer-value">danielle@harmonizedtherapies.com.au</p>
          </div>
          <div className="footer-divider" />
          <div className="footer-item">
            <p className="footer-label">Website</p>
            <p className="footer-value">harmonizedtherapies.com.au</p>
          </div>
        </div>

      </div>
    </>
  )
}
