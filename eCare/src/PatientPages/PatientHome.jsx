import React from 'react'
import PHeroSection from './PHeroSection'
import OurServices from "./OurServices"
import Speciality from './Speciality'
import PrescriptionButton from './Prescription';
export default function PatientHome() {
  return (
    <div>
    <PHeroSection/>
    <OurServices/>
    <Speciality/>
    <PrescriptionButton />
    </div>
    

  )
}
