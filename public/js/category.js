const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#category_name').value.trim();
  const user = document.querySelector('#user_id').value.trim();

  if (name) {
    const response = await fetch(`/api/categories`, {
      method: 'POST',
      body: JSON.stringify({
        category_name: name,
        user_id: user
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create an Item');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/categories/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete item');
    }
  }
};

document
  .querySelector('.new-category-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.category-list')
  .addEventListener('click', delButtonHandler);
