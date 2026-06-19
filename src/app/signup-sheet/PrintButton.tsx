'use client'

export default function PrintButton() {
  return (
    <div className="no-print" style={{ textAlign: 'center', padding: '20px', background: '#f8f5f0' }}>
      <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#6b6b65', marginBottom: '10px' }}>
        Tudor Village Lilydale — Friday massage sign-up sheet
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
        Print sheet
      </button>
    </div>
  )
}
