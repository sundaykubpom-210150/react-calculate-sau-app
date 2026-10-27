import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import bmrImg from '../assets/bmr.png'

export default function Bmr() {
  const navigate = useNavigate()

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [bmrResult, setBmrResult] = useState('0.00')

  const handleCalculate = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    const a = parseFloat(age)

    if (w > 0 && h > 0 && a > 0) {
      let bmr = 0
      if (gender === 'male') {
        bmr = 66 + (13.7 * w) + (5 * h) - (6.8 * a)
      } else {
        bmr = 665 + (9.6 * w) + (1.8 * h) - (4.7 * a)
      }
      setBmrResult(bmr.toFixed(2))
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง')
    }
  }

  const handleReset = () => {
    setWeight('')
    setHeight('')
    setAge('')
    setGender('male')
    setBmrResult('0.00')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '450px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }}>BMR Calculator</h2>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>คำนวณ BMR</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img src={bmrImg} alt="BMR" style={{ width: '90px', height: '90px', objectFit: 'contain' }} />
        </div>

        <div style={{ textAlign: 'left', marginBottom: '15px' }}>
          <input 
            type="number" 
            placeholder="ป้อนน้ำหนัก (กิโลกรัม)" 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }} 
          />
        </div>
        <div style={{ textAlign: 'left', marginBottom: '15px' }}>
          <input 
            type="number" 
            placeholder="ป้อนส่วนสูง (เซนติเมตร)" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }} 
          />
        </div>
        <div style={{ textAlign: 'left', marginBottom: '15px' }}>
          <input 
            type="number" 
            placeholder="ป้อนอายุ (ปี)" 
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }} 
          />
        </div>

        <div style={{ textAlign: 'left', marginBottom: '20px', fontSize: '13px', color: '#555' }}>
          เพศ: <br />
          <label style={{ marginRight: '15px', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="gender" 
              value="male" 
              checked={gender === 'male'} 
              onChange={() => setGender('male')} 
            /> ชาย
          </label>
          <label style={{ cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="gender" 
              value="female" 
              checked={gender === 'female'} 
              onChange={() => setGender('female')} 
            /> หญิง
          </label>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={handleCalculate}
            style={{ flex: 1, background: '#6366f1', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            คำนวณ BMR
          </button>
          <button 
            onClick={handleReset}
            style={{ flex: 1, background: '#ef4444', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            รีเซ็ต
          </button>
        </div>

        <div style={{ fontSize: '13px', color: '#333', marginBottom: '20px' }}>
          ค่า BMR ที่คำนวณได้: <span style={{ color: '#6366f1', fontWeight: 'bold' }}>{bmrResult}</span>
        </div>

        <button 
          onClick={() => navigate('/')}
          style={{ width: '100%', background: '#e5e7eb', color: '#333', border: 'none', padding: '10px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px' }}
        >
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  )
}