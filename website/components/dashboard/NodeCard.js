import React from 'react';
import styles from "../../styles/Card.module.css";
import Card from './Card';
import { FaSync } from 'react-icons/fa';

const NodeCard = ({ data }) => {
    const [selectedNode, setSelectedNode] = React.useState(null);
    
    const formatUptime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        return `${hours}h ${minutes}m`;
    }

    const handleViewClick = (node) => {
        setSelectedNode(node);
    }

    return (
        <div>
            <Card title={"Nodes:"}>
                <br></br>
                {data && data.map((node, index) => (
                    <div key={index} className={styles.node}>
                        <span
     