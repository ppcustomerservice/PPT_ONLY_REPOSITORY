"use client";
import React, { useState } from "react";
import { Slider, TextField } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons
import "./calculator.css";


const HomeLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [interestRate, setInterestRate] = useState(9);
  const [loanTenure, setLoanTenure] = useState(84);
  const [darkMode, setDarkMode] = useState(false);

  const r = interestRate / 12 / 100;
  const n = loanTenure;
  const EMI = ((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)).toFixed(3);
  const totalAmountPayable = EMI * n;
  const totalInterest = totalAmountPayable - loanAmount;

  const data = [
    { name: "Principal", value: loanAmount },
    { name: "Interest", value: parseFloat(totalInterest.toFixed(3)) },
  ];

  return (
    <div className={`calculator-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      
      {/* Header with Toggle */}
      <div className="header">
        <h2>House Hunt Finance Tool</h2>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="calculator">
        <div className="input-section">
          <label>Loan Amount</label>
          <TextField
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            fullWidth
            variant="outlined"
          />
          <Slider value={loanAmount} onChange={(e, val) => setLoanAmount(val)} min={1000000} max={500000000} step={1000000} valueLabelDisplay="auto" />

          <label>Interest Rate (p.a.)</label>
          <TextField type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} fullWidth variant="outlined" />
          <Slider value={interestRate} onChange={(e, val) => setInterestRate(val)} min={1} max={20} step={0.1} valueLabelDisplay="auto" />

          <label>Duration (Years & Months)</label>
          <TextField type="number" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} fullWidth variant="outlined" />
          <Slider value={loanTenure} onChange={(e, val) => setLoanTenure(val)} min={12} max={360} step={1} valueLabelDisplay="auto" />

          <p>Duration: {Math.floor(loanTenure / 12)} Years {loanTenure % 12} Months</p>
        </div>

        <div className="result-section">
          <h3>Monthly EMI</h3>
          <div className="emi-display">₹{Math.round(EMI).toLocaleString()}</div>
          <p>Principal Amount: ₹{loanAmount.toLocaleString()}</p>
          <p>Total Interest Payable: ₹{Math.round(totalInterest).toLocaleString()}</p>
          <p>Total Amount Payable: ₹{Math.round(totalAmountPayable).toLocaleString()}</p>

          <PieChart width={300} height={300} style={{ margin: "0 auto" }}>
            <Pie data={data} dataKey="value" outerRadius={100} label>
              <Cell fill="#FF5733" />  {/* Orange-Red for Principal */}
              <Cell fill="#FFC300" />  {/* Yellow for Interest */}
            </Pie>
            <Tooltip formatter={(value) => value.toFixed(3)} />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanCalculator;
