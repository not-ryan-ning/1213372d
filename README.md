# Speer Frontend Challenge

## Implemented Functionalities

1. **Activity Feed**:
   - Fetches call data from the API and displays it in a feed.
   - Utilizes React's `useEffect` for data fetching on component mount.
   - Manages state using `useState` to store call data and selected call.

2. **Activity Detail**:
   - Displays detailed information of a call when a call item is clicked.
   - Utilizes conditional rendering to show `CallDetails` based on the selected call.

3. **Archiving Calls**:
   - Implements individual call archiving/unarchiving with a PATCH request to the server.
   - Updates the state and the server when the archive button is clicked.

4. **Archive/Unarchive All**:
   - Makes batch PATCH requests to update the server state for all calls on click of archive / unarchive all button.

## Additional Implementation Details
  - Used Bootstrap for responsive and consistent styling across the application.
  - Implemented routing using React Router to create a seamless SPA experience.
  - Basic error handling for API requests to ensure robustness.



