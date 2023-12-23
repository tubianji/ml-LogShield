/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Card from './Card';
import Chart from 'chart.js/auto';
import styles from "../../styles/Performance.module.css";

const Performance = () => {
  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
        {
          label: 'Requests',
          data: [50, 100, 150, 180, 90, 120, 200],
          fill: false,
          backgroundColor: 'transparent'