import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [spendingError, setSpendingError] = useState('');
    const [exceedingError, setExceedingError] = useState('');

    const totalSpending = expenses.reduce((total, expense) => total + expense.cost, 0);

    const handleBudgetChange = (event) => {
        const newValue = parseFloat(event.target.value);
        if (!isNaN(newValue) && newValue >= 0 && newValue <= 20000) {
            setNewBudget(newValue);
            setSpendingError(''); // Clear any spending error
            setExceedingError(''); // Clear any exceeding error
        } else {
            setNewBudget(newValue);
            setSpendingError('Budget must be between 0 and 20,000.');
            setExceedingError('');
        }
        if (newValue < totalSpending) {
            setSpendingError('Budget cannot be lower than total spending.');
        }
    };

    const increaseBudget = () => {
        const increasedBudget = newBudget + 10;
        if (increasedBudget <= 20000) {
            setNewBudget(increasedBudget);
            dispatch({ type: 'SET_BUDGET', payload: increasedBudget });
            setSpendingError(''); // Clear any spending error
            setExceedingError(''); // Clear any exceeding error
        }
    };

    const decreaseBudget = () => {
        const decreasedBudget = newBudget - 10;
        if (decreasedBudget >= 0) {
            setNewBudget(decreasedBudget);
            dispatch({ type: 'SET_BUDGET', payload: decreasedBudget });
            setSpendingError(''); // Clear any spending error
            setExceedingError(''); // Clear any exceeding error
        }
        if (decreasedBudget < totalSpending) {
            setSpendingError('Budget cannot be lower than total spending.');
        }
    };

    return (
        <div>
            <div className='alert alert-secondary'>
                <span>Budget: £{newBudget}</span>
                <button className="btn btn-primary ml-2" onClick={increaseBudget}>Increase by 10</button>
                <button className="btn btn-danger ml-2" onClick={decreaseBudget}>Decrease by 10</button>
                <input
                    type="number"
                    step="10"
                    min="0"
                    max="20000"
                    value={newBudget}
                    onChange={handleBudgetChange}
                />
                <span className="input-group-text">{currency}</span>
            </div>
            {spendingError && (
                <div className="alert alert-warning mt-2">
                    {spendingError}
                </div>
            )}
            {exceedingError && (
                <div className="alert alert-danger mt-2">
                    {exceedingError}
                </div>
            )}
        </div>
    );
};

export default Budget;



