import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

export default function CompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

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

  const getFilteredTasks = () => {
    const now = new Date();

    switch (selectedPeriod) {
      case 'today':
        return completedTasks.filter(
          (task) =>
            new Date(task.updatedAt).toDateString() === now.toDateString()
        );

      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return completedTasks.filter(
          (task) => new Date(task.updatedAt) >= weekAgo
        );

      case 'month':
        const monthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        return completedTasks.filter(
          (task) => new Date(task.updatedAt) >= monthAgo
        );

      default:
        return completedTasks;
    }
  };

  const filteredTasks = getFilteredTasks();

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
  <div className="mb-6">
    <p className="text-lg">
      Showing <span className="font-semibold">{filteredTasks.length}</span>{' '}
      completed task{filteredTasks.length !== 1 ? 's' : ''} for{' '}
      <span className="font-semibold">{selectedPeriod}</span> period.
    </p>
  </div>

  {/* ⬇️ Dropdown Filter */}
  <div className="mb-6">
    <label htmlFor="period" className="mr-2 font-medium">
      Filter by:
    </label>
    <select
      id="period"
      value={selectedPeriod}
      onChange={(e) => setSelectedPeriod(e.target.value)}
      className="text-black px-2 py-1 rounded"
    >
      <option value="all">All</option>
      <option value="today">Today</option>
      <option value="week">This Week</option>
      <option value="month">This Month</option>
    </select>
    {/* ⬇️ Task List */}
  <div className="space-y-4">
    {filteredTasks.length === 0 ? (
      <p className="text-neutral-400">No completed tasks for this period.</p>
    ) : (
      filteredTasks.map((task) => (
        <div
          key={task.id}
          className="bg-neutral-800 p-4 rounded shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-sm text-neutral-400">
            Completed on{' '}
            {new Date(task.updatedAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
      ))
    )}
  </div>
</div>
        </div>
      )}
    </div>
  );
}
