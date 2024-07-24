import { useState } from 'react';

export const useFlip = () => {
  // Initialize the flip state
  const [isFlipped, setFlipped] = useState(false);

  // Function to toggle the flip state
  const flip = () => {
    setFlipped((prev) => !prev);
  };

  // Return the state and the toggle function
  return [isFlipped, flip];
};

/**
 * Hook that provides an array of responses, a function to add new responses, and a function to clear all responses.
 * It uses local storage to persist the responses across different renders.
 *
 * @param {string} keyInLS - The key used to store the responses in local storage.
 * @param {string} baseUrl - The base URL for the axios requests.
 * @returns {[Array, Function, Function]} - An array of responses, a function to add new responses, and a function to clear all responses.
 */
function useAxios(keyInLS, baseUrl) {
    // Initialize the state for the responses with the values from local storage, or an empty array if none were found.
    const [responses, setResponses] = useLocalStorage(keyInLS);
  
    /**
     * Function to add a new response to the responses array.
     *
     * @param {Function} formatter - A function to format the response data. Defaults to identity function.
     * @param {string} restOfUrl - The rest of the URL for the axios request.
     */
    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
      // Send an axios request to the provided URL and get the response.
      const response = await axios.get(`${baseUrl}${restOfUrl}`);
      // Add the response data to the responses array, using the formatter to format the data.
      setResponses(data => [...data, formatter(response.data)]);
    };
  
    /**
     * Function to clear all responses from the responses array.
     */
    const clearResponses = () => setResponses([]);
  
    // Return the responses array, the addResponseData function, and the clearResponses function.
    return [responses, addResponseData, clearResponses];
  }
  
/**
   * Custom React hook to manage state persistence in local storage.
   *
   * @param {string} key - The key under which to store the state in local storage.
   * @param {any} initialValue - The initial value of the state, defaults to an empty array.
   * @returns {[any, Function]} - An array containing the current state value and a function to update the state.
   */
  function useLocalStorage(key, initialValue = []) {
    // Check if the key exists in local storage and parse the stored value if found
    if (localStorage.getItem(key)) {
      initialValue = JSON.parse(localStorage.getItem(key));
    }
  
    // Initialize the state with the initial value
    const [value, setValue] = useState(initialValue);
  
    // Update the local storage whenever the state changes
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    // Return the current state value and the function to update the state
    return [value, setValue];
  }
  
  export default useLocalStorage;
  
  export { useFlip, useAxios, useLocalStorage };
  