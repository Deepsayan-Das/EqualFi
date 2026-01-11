// src/lib/weilliptic/creditApi.js

/**
 * Universal Helper for Credit Score Applet
 * @param {string} method - The function name (e.g. 'get_score')
 * @param {Object} payload - The arguments object matching the binding parameters
 * @returns {Promise<any>} - The result from the blockchain
 */
export const credit = async (method, payload = {}) => {
  try {
    const response = await fetch(`/api/credit/${method}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Credit Operation Failed');
    }

    return data.result;

  } catch (error) {
    console.error(`[Credit API] Call to '${method}' failed:`, error);
    throw error;
  }
};