import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import carImg from '../assets/car.png'

export default function Car() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [carPrice, setCarPrice] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [downPercent, setDownPercent] = useState(15)
  const [months, setMonths] = useState(24)
  const [monthlyInstallment, setMonthlyInstallment] = useState('0.00')

  const handleCalculate = () => {
    const price = parseFloat(carPrice)
    const rate = parseFloat(interestRate)

    if (price > 0 && rate >= 0) {
      const downAmount = price * (downPercent / 100)
      const financeAmount = price - downAmount
      const years = months / 12
      const totalInterest = financeAmount * (rate / 100) * years
      const totalPay = financeAmount + totalInterest
      const perMonth = totalPay / months

      setMonthlyInstallment(perMonth.toFixed(2))
    } else {
      alert('กรุณากรอกราคารถและอัตราดอกเบี้ยให้ถูกต้อง')
    }
  }

  const handleReset = () => {
    setName('')
    setCarPrice('')
    setInterestRate('')
    setDownPercent(15)
    setMonths(24)
    setMonthlyInstallment('0.00')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '450px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }}>Car Installment Calculator</h2>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>คำนวณ Car Installment</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img src={carImg} alt="Car" style={{ width: '90px', height: '90px', objectFit: 'contain' }} />
        </div>

        <div style={{ textAlign: 'left', marginBottom: '12px' }}>
          <input 
            type="text" 
            placeholder="ชื่อผู้คำนวณ" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }} 
          />
        </div>
        <div style={{ textAlign: 'left', marginBottom: '12px' }}>
          <input 
            type="number" 
            placeholder="ราคารถ (บาท)" 
            value={carPrice}
            onChange={(e) => setCarPrice(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }} 
          />
        </div>
        <div style={{ textAlign: 'left', marginBottom: '12px' }}>
          <input 
            type="number" 
            placeholder="ดอกเบี้ยต่อปี (%)" 
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }} 
          />
        </div>

        <div style={{ textAlign: 'left', marginBottom: '12px', fontSize: '13px', color: '#555' }}>
          เงินดาวน์ (%): <br />
          {[15, 20, 25, 30, 35].map((p) => (
            <label key={p} style={{ marginRight: '10px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="down" 
                value={p}
                checked={downPercent === p}
                onChange={() => setDownPercent(p)}
              /> {p}%
            </label>
          ))}
        </div>

        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', color: '#333', display: 'block', marginBottom: '5px' }}>จำนวนเดือนที่ผ่อน</label>
          <select 
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value))}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' }}
          >
            <option value={24}>24 เดือน</option>
            <option value={36}>36 เดือน</option>
            <option value={48}>48 เดือน</option>
            <option value={60}>60 เดือน</option>
            <option value={72}>72 เดือน</option>
            <option value={84}>84 เดือน</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={handleCalculate}
            style={{ flex: 1, background: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            คำนวณ
          </button>
          <button 
            onClick={handleReset}
            style={{ flex: 1, background: '#d1d5db', color: '#333', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ล้างข้อมูล
          </button>
        </div>

        <div style={{ fontSize: '13px', color: '#333', marginBottom: '20px' }}>
          ผ่อนชำระต่อเดือน: <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{monthlyInstallment} บาท</span>
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