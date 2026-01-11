// src/lib/weilliptic/api.js

/**
 * Universal helper to call your In-Memory DB API.
 * * @param {string} method - The name of the DB function (e.g., 'insert', 'get_value', 'create_table')
 * @param {Object} payload - The arguments required by that function (e.g., { table, key, field, value })
 * @returns {Promise<any>} - The 'result' data from the API response
 * @throws {Error} - Throws if the API call fails or returns success: false
 */
export const db = async (method, payload = {}) => {
  try {
    const response = await fetch(`/api/db/${method}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(payload),
    });

    // 1. Check for Network/Server errors (404, 500, etc.)
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // 2. Check for Logical/Blockchain errors (defined in your API route)
    if (!data.success) {
      throw new Error(data.error || 'Unknown Database Operation Failed');
    }

    // 3. Return only the actual result data
    return data.result;

  } catch (error) {
    // Log generic error for dev debugging
    console.error(`[DB Helper] Call to '${method}' failed:`, error);
    // Re-throw so the frontend component can display the specific error message
    throw error;
  }
};