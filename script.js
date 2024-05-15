document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('userForm');
  const userList = document.getElementById('userList');

  // Event listener for form submission
  form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const age = document.getElementById('age').value;

      try {
          const response = await fetch('/users', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, email, age })
          });

          if (!response.ok) {
              throw new Error('Failed to add user');
          }

          const newUser = await response.json();

          // Add the new user to the user list
          const userItem = document.createElement('div');
          userItem.textContent = `Name: ${newUser.name}, Email: ${newUser.email}, Age: ${newUser.age}`;
          userList.appendChild(userItem);

          // Clear the form fields
          form.reset();
      } catch (error) {
          console.error('Error:', error.message);
          const errorDiv = document.createElement('div');
          errorDiv.textContent = 'Failed to add user';
          errorDiv.id = 'error';
          form.appendChild(errorDiv);
      }
  });

  // Function to fetch all users and display them on page load
  async function fetchUsers() {
      try {
          const response = await fetch('/users');
          const users = await response.json();

          users.forEach(user => {
              const userItem = document.createElement('div');
              userItem.textContent = `Name: ${user.name}, Email: ${user.email}, Age: ${user.age}`;
              userList.appendChild(userItem);
          });
      } catch (error) {
          console.error('Error:', error.message);
      }
  }

  // Call fetchUsers function on page load
  fetchUsers();
});
