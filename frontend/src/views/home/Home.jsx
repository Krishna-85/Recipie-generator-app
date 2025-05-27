import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'
import Logout from '../../components/Logout'

const Home = () => {
    const user = useSelector((state) => state.user);
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const [dietGoal, setDietGoal] = useState('balanced');

    const dietGoalOptions = [
        { value: 'balanced', label: 'Balanced Diet' },
        { value: 'weight-gain', label: 'Weight Gain' },
        { value: 'weight-loss', label: 'Weight Loss' },
        { value: 'muscle-build', label: 'Muscle Building' },
        { value: 'low-carb', label: 'Low Carb' },
        { value: 'high-protein', label: 'High Protein' }
    ];

    const handleAddIngredient = (e) => {
        e.preventDefault();
        if (ingredient.trim()) {
            setIngredients([...ingredients, ingredient.trim()]);
            setIngredient('');
            toast.success("Ingredient added");
        } else {
            toast.error("Enter a valid ingredient");
        }
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
        toast.success("Ingredient removed");
    };

    const handleSubmitIngredients = async () => {
        if (ingredients.length === 0) {
            toast.error('Please add at least one ingredient');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(
                `https://recipie-generator-app.onrender.com/api/v1/recipe/ingredients`,
                { ingredients, dietGoal },
                { withCredentials: true }
            );

            console.log('Response from server:', response.data);
            setRecipe(response.data.recipe);
            setIngredients([]);
            toast.success('Ingredients submitted successfully!');
        } catch (error) {
            toast.error('Failed to submit ingredients. Please try again.');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <div className="min-h-screen bg-gray-50 p-2 sm:p-6">
        <Logout/>
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-2 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">
                    {user.username ? `Welcome, ${user.username}!` : 'Home'}
                </h1>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg sm:text-xl font-medium">Add Ingredients</h2>
                        <p className="text-xs sm:text-sm text-gray-600">Enter ingredients one by one</p>

                        <form onSubmit={handleAddIngredient} className="mt-4 flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                                placeholder="Enter an ingredient"
                                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400 text-sm"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
                            >
                                Add
                            </button>
                        </form>
                    </div>

                    <div>
                        <label htmlFor="dietGoal" className="block font-medium mb-1 text-sm sm:text-base">
                            Select Diet Goal:
                        </label>
                        <select
                            id="dietGoal"
                            value={dietGoal}
                            onChange={(e) => setDietGoal(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400 text-sm"
                        >
                            {dietGoalOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {ingredients.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-base sm:text-lg mb-2">My Ingredients:</h3>
                            <ul className="space-y-2 mb-4">
                                {ingredients.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 px-4 py-2 rounded-md"
                                    >
                                        <span className="text-sm">{item}</span>
                                        <button
                                            onClick={() => handleRemoveIngredient(index)}
                                            className="text-red-500 hover:underline text-xs mt-1 sm:mt-0"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={handleSubmitIngredients}
                                disabled={isSubmitting}
                                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50 text-sm"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Ingredients'}
                            </button>
                        </div>
                    )}

                    {recipe && (
                        <div className="mt-8 p-2 sm:p-4 bg-green-50 border overflow-y-auto border-green-300 rounded-md">
                            <h2 className="text-lg sm:text-xl font-bold mb-2">Your Recipe</h2>
                            <div className="prose prose-sm max-w-none">
                                <ReactMarkdown>{recipe}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;