import React, { useState, useEffect } from 'react';

export default function CompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    // Placeholder for now
    try {
      setLoading(true);
      // TODO: Fetch tasks here
    } catch (err) {
      console.error(err);
      setError('Failed to fetch completed tasks.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="completedtasks w-full min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Completed Tasks</h1>

      {error && (
        <div className="bg-red-600 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-neutral-400">Loading...</div>
      ) : (
        <div>
          {/* We'll render tasks and filters here later */}
        </div>
      )}
    </div>
  );
}
import ApiService from '../services/api'; 

const fetchCompletedTasks = async () => {
  try {
    setLoading(true);
    const allTasks = await ApiService.getTasks();
    const completed = allTasks.filter(task => task.completed);
    setCompletedTasks(completed);
    setError(null);
  } catch (err) {
    console.error(err);
    setError('Failed to fetch completed tasks.');
  } finally {
    setLoading(false);
  }
};
