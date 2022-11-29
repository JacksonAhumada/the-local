const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#item_name').value.trim();
  const website = document.querySelector('#website').value.trim();
  const category_id = document.querySelector('#category_id').value.trim();

  if (name && website && category_id) {
    const response = await fetch(`/api/items`, {
      method: 'POST',
      body: JSON.stringify({ name, website, category_id }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create an Item');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete item');
    }
  }
};

document
  .querySelector('.new-item-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.item-list')
  .addEventListener('click', delButtonHandler);
