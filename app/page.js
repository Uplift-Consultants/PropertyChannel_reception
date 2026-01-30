'use client';

import React from 'react';
import { useGetDashboardInfoQuery } from '@lib/slices/agentApiSlice';
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Skeleton from "react-loading-skeleton"


export default function Home() {

  const { data: dashboardInfo, error, isLoading, isSuccess } = useGetDashboardInfoQuery();

    const queue = [
    { category: 'low', count: 0, color: '#0088FE' },
    { category: 'medium', count: 0 },
    { category: 'high', count: 0 },
    { category: 'critical', count: 0 },
  ];

  const properties = [
    { category: 'for sale', count: dashboardInfo?.total, color: '#0088FE' },
  ]

    const COLORS = ['#4CAF50', '#FFBB28', '#0088FE', '#FF8042'];

  const data = [
  { name: 'C1', inventory: 400, color: '#0088FE' },
  { name: 'C2', inventory: 300 },
  { name: 'C3', inventory: 200 },
  { name: 'C4', inventory: 150 },
  { name: 'C5', inventory: 150 },
  { name: 'C6', inventory: 180 },
];
  
  return (
    <>
    <div>
      <div className="widgets wrapper">
        {
          isLoading && <Skeleton height={244} borderRadius={20} />
        }
        {
          isSuccess &&
            <motion.div className="widget card listings" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease: "easeOut" }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className='title'>
                  <i className='icon queue'>
                  </i>
                  <span className="title">Total Listings</span>                    
              </div>
              <div className="content">
                <div style={{ width: "100%", height: 200 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie 
                        data={dashboardInfo.total === 0 ? [{count: 1}] : properties} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60} 
                        outerRadius={80} 
                        paddingAngle={5} 
                        dataKey="count"
                      >
                        {dashboardInfo.total === 0 ? (
                          <Cell fill="#CCCCCC" />
                        ) : (
                          data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))
                        )}
                      </Pie>
                      <text x="50%" y="50%" textAnchor='middle' dominantBaseline='middle' fontSize="3rem" fontWeight="400">
                        {dashboardInfo.total}
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className='details'>
                  <li>
                    <i className='indicator for-sale'></i>
                    <span>For Sale </span>
                  </li>
                  <li>
                    <i className='indicator for-rent'></i>
                    <span>For Rent </span>
                  </li>
                </ul>

              </div>
            </motion.div>
        }

        <div className="widget card default">
          <div className="title">
            <span>Sales</span>
          </div>

        </div>
        <div className="widget card default">

        </div>
        <div className="widget card primary">
          <div className="title">
            <span>Reminders</span>
          </div>
        </div>
      </div>
    </div>
 
    </>
  );
} 