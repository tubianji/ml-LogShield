"use client";

import React from 'react';
import axios from 'axios';
import styles from "../../styles/DashboardArea.module.css";
import TopRow from './TopRow';
import ActivityCard from './ActivityCard';
import NodeCard from './NodeCard';
import LargestAttacks from './LargestAttacks';
import APICard from './APICard';
import LoadingBar from './LoadingBar';
import Performance from '.