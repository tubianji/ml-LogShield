import React from 'react';
import Card from './Card';
import { Chart } from 'chart.js/auto';
import styles from "../../styles/Performance.module.css";

const mergeTotalblockedData = (data) => {
  if (!data) {
    console.error('Data is undefined');
    return {};
  }
  const mergedData = data.reduce((acc, nodeData) => {
    if (nodeData.rateLimit && nodeData.rateLimit.Totalblocked) {
      for (let [key, value] of Object.e