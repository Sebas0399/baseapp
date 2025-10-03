'use client';

import { useState } from 'react';

interface SplitItem {
  id: string;
  name: string;
  amount: number;
  people: string[];
}

interface Person {
  id: string;
  name: string;
  color: string;
}

export default function BaseSplit() {
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: 'Ana', color: 'bg-blue-500' },
    { id: '2', name: 'Carlos', color: 'bg-green-500' },
    { id: '3', name: 'María', color: 'bg-purple-500' },
  ]);

  const [items, setItems] = useState<SplitItem[]>([
    { id: '1', name: 'Cena', amount: 120.00, people: ['1', '2', '3'] },
    { id: '2', name: 'Propina', amount: 18.00, people: ['1', '2', '3'] },
    { id: '3', name: 'Uber', amount: 15.00, people: ['1', '2'] },
  ]);

  const [newPersonName, setNewPersonName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');

  const colors = ['bg-red-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'];

  const addPerson = () => {
    if (newPersonName.trim()) {
      const newPerson: Person = {
        id: Date.now().toString(),
        name: newPersonName.trim(),
        color: colors[people.length % colors.length],
      };
      setPeople([...people, newPerson]);
      setNewPersonName('');
    }
  };

  const addItem = () => {
    if (newItemName.trim() && newItemAmount) {
      const newItem: SplitItem = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        amount: parseFloat(newItemAmount),
        people: people.map(p => p.id),
      };
      setItems([...items, newItem]);
      setNewItemName('');
      setNewItemAmount('');
    }
  };

  const togglePersonInItem = (itemId: string, personId: string) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const updatedPeople = item.people.includes(personId)
          ? item.people.filter(id => id !== personId)
          : [...item.people, personId];
        return { ...item, people: updatedPeople };
      }
      return item;
    }));
  };

  const calculatePersonTotal = (personId: string) => {
    return items.reduce((total, item) => {
      if (item.people.includes(personId) && item.people.length > 0) {
        return total + (item.amount / item.people.length);
      }
      return total;
    }, 0);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          BaseSplit
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Divide gastos de forma fácil y justa
        </p>
      </div>

      {/* People Management */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Personas
        </h2>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {people.map((person) => (
            <div
              key={person.id}
              className={`${person.color} text-white px-4 py-2 rounded-full font-medium shadow-md`}
            >
              {person.name}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            placeholder="Nombre de la persona"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            onKeyPress={(e) => e.key === 'Enter' && addPerson()}
          />
          <button
            onClick={addPerson}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Items and Split */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Gastos
        </h2>

        {/* Add New Item */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Descripción del gasto"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            placeholder="Monto"
            step="0.01"
            className="w-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={addItem}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
          >
            Agregar
          </button>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <span className="text-xl font-bold text-green-600">
                  ${item.amount.toFixed(2)}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {people.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => togglePersonInItem(item.id, person.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      item.people.includes(person.id)
                        ? `${person.color} text-white shadow-md`
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                    }`}
                  >
                    {person.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Resumen
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => {
            const total = calculatePersonTotal(person.id);
            return (
              <div
                key={person.id}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-4 h-4 rounded-full ${person.color}`}></div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {person.name}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${total.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              Total:
            </span>
            <span className="text-3xl font-bold text-green-600">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}