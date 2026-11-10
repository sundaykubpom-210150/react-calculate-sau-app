import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import bmrImg from '../assets/bmr.png'
import Swal from 'sweetalert2'

export default function Bmr() {
  const navigate = useNavigate()

  // สร้าง State สำหรับเก็บค่าน้ำหนัก, ส่วนสูง, อายุ, เพศ และผลลัพธ์
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [bmrResult, setBmrResult] = useState('0.00')

  // ฟังก์ชันคำนวณ BMR
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

      // แสดง SweetAlert2 เมื่อคำนวณสำเร็จ
      let timerInterval;
      Swal.fire({
        title: "คำนวณสำเร็จ!",
        html: "กำลังประมวลผลใน <b></b> มิลลิวินาที",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });

    } else {
      // แจ้งเตือนเมื่อกรอกข้อมูลไม่ถูกต้องหรือยังไม่ครบ
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง',
        confirmButtonText: 'ตกลง'
      })
    }
  }

  // ฟังก์ชันรีเซ็ตข้อมูล
  const handleReset = () => {
    setWeight('')
    setHeight('')
    setAge('')
    setGender('male')
    setBmrResult('0.00')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Kanit', sans-serif" }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '450px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px', fontFamily: "'Kanit', sans-serif" }}>BMR Calculator</h2>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px', fontFamily: "'Kanit', sans-serif" }}>คำนวณ BMR</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img src={bmrImg} alt="BMR" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
        </div>

        {/* ช่องกรอกน้ำหนัก */}
        <div style={{ textAlign: 'left', marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', color: '#333', display: 'block', marginBottom: '5px', fontFamily: "'Kanit', sans-serif" }}>ป้อนน้ำหนัก (กิโลกรัม)</label>
          <input
            type="number"
            placeholder="น้ำหนัก"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box', fontFamily: "'Kanit', sans-serif" }}
          />
        </div>

        {/* ช่องกรอกส่วนสูง */}
        <div style={{ textAlign: 'left', marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', color: '#333', display: 'block', marginBottom: '5px', fontFamily: "'Kanit', sans-serif" }}>ป้อนส่วนสูง (เซนติเมตร)</label>
          <input
            type="number"
            placeholder="ส่วนสูง"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box', fontFamily: "'Kanit', sans-serif" }}
          />
        </div>

        {/* ช่องกรอกอายุ */}
        <div style={{ textAlign: 'left', marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', color: '#333', display: 'block', marginBottom: '5px', fontFamily: "'Kanit', sans-serif" }}>ป้อนอายุ (ปี)</label>
          <input
            type="number"
            placeholder="อายุ"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box', fontFamily: "'Kanit', sans-serif" }}
          />
        </div>

        {/* เลือกเพศ */}
        <div style={{ textAlign: 'left', marginBottom: '20px', fontSize: '13px', color: '#333', fontFamily: "'Kanit', sans-serif" }}>
          <label style={{ fontSize: '12px', color: '#333', display: 'block', marginBottom: '5px', fontFamily: "'Kanit', sans-serif" }}>เพศ</label>
          <label style={{ marginRight: '20px', cursor: 'pointer', fontFamily: "'Kanit', sans-serif" }}>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={() => setGender('male')}
            /> ชาย
          </label>
          <label style={{ cursor: 'pointer', fontFamily: "'Kanit', sans-serif" }}>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={() => setGender('female')}
            /> หญิง
          </label>
        </div>

        {/* ปุ่มคำนวณ BMR */}
        <button
          onClick={handleCalculate}
          style={{ width: '100%', background: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px', fontFamily: "'Kanit', sans-serif" }}
        >
          คำนวณ BMR
        </button>

        {/* ปุ่มรีเซ็ตข้อมูล */}
        <button
          onClick={handleReset}
          style={{ width: '100%', background: '#f3f4f6', color: '#333', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', marginBottom: '20px', fontFamily: "'Kanit', sans-serif" }}
        >
          รีเซ็ต
        </button>

        {/* แสดงผลลัพธ์ */}
        <div style={{ fontSize: '13px', color: '#333', marginBottom: '20px', fontFamily: "'Kanit', sans-serif" }}>
          ค่า BMR ที่คำนวณได้: <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{bmrResult}</span>
        </div>

        {/* ปุ่มกลับหน้าหลัก */}
        <button
          onClick={() => navigate('/')}
          style={{ width: '100%', background: '#e5e7eb', color: '#333', border: 'none', padding: '10px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontFamily: "'Kanit', sans-serif" }}
        >
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  )
}