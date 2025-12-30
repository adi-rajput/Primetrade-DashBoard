'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/utils/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, CheckCircle, Circle, Search, Filter } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function DashboardPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      fetchTasks();
    }
  }, [token, router]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) return;
    try {
      const res = await api.post('/tasks', newTask);
      setTasks([...tasks, res.data]);
      setNewTask({ title: '', description: '' });
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const toggleStatus = async (task: Task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      const res = await api.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'all') return true;
      return task.status === filter;
    })
    .filter((task) => 
      task.title.toLowerCase().includes(search.toLowerCase()) || 
      task.description.toLowerCase().includes(search.toLowerCase())
    );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'in-progress': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back, <span className="text-indigo-400 font-medium">{user.name}</span></p>
        </div>
        
        <Button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 shadow-indigo-500/20">
          <Plus size={20} />
          {isAdding ? 'Cancel' : 'New Task'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Tasks', value: tasks.length, color: 'indigo' },
          { label: 'Pending', value: tasks.filter(t => t.status === 'pending').length, color: 'amber' },
          { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: 'emerald' },
        ].map((stat, idx) => (
          <div key={idx} className="p-6 rounded-2xl glass-card relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity bg-${stat.color}-500 blur-3xl rounded-full h-32 w-32 -mr-10 -mt-10`} />
            <h3 className="text-slate-400 text-sm font-medium mb-2">{stat.label}</h3>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-10 overflow-hidden"
            onSubmit={addTask}
          >
            <div className="p-6 rounded-2xl glass-panel space-y-4">
              <h3 className="text-lg font-semibold text-white">Create New Task</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-slate-900/50"
                />
                <Input
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="bg-slate-900/50"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="w-full md:w-auto">Add Task</Button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all whitespace-nowrap ${
                filter === f 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
                  : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 rounded-2xl glass-card flex items-center gap-4 group hover:bg-slate-800/60"
              >
                <button
                  onClick={() => toggleStatus(task)}
                  className={`flex-shrink-0 transition-colors ${
                    task.status === 'completed' ? 'text-emerald-500' : 'text-slate-500 hover:text-indigo-500'
                  }`}
                >
                  {task.status === 'completed' ? <CheckCircle size={24} /> : <Circle size={24} />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-lg truncate ${
                    task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-200'
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-slate-400 text-sm truncate">{task.description}</p>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                  {task.status}
                </div>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                <Filter size={32} />
              </div>
              <p className="text-slate-400 text-lg">No tasks found</p>
              <p className="text-slate-500">Try adjusting your filters or add a new task</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
