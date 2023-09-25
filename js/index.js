


const task = document.getElementById('floatingInputGrid-task');
const date = document.getElementById('floatingInputGrid-date');
const incomplete = document.getElementById('inCompleteList');
const complete = document.getElementById('completeList');
const locate = document.getElementById('locList')


const addTask = () => {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = false; 
    checkbox.addEventListener('change',moveTask)
    let list = document.createElement('li');
    list.classList.add('txt');
    list.innerHTML = task.value;

    let dat = document.createElement('p');
    dat.innerHTML = date.value;

    let div = document.createElement('div');
    div.classList.add('incompleteTask');
    div.classList.add('d-flex')
    let div_2 = document.createElement('div')
    let div_3 = document.createElement('div')
    div_2.classList.add('my-auto')
    div_2.classList.add('me-2')
    div.append(div_2)
    div.append(div_3)
    div_2.appendChild(checkbox);
    div_3.appendChild(list);
    div_3.appendChild(dat);

    incomplete.appendChild(div);

    task.value = '';
    date.value = '';

  
   
}

const moveTask = (event) => {
      const listItem = event.target.parentNode.parentNode;

    listItem.querySelector('input[type="checkbox"]').removeEventListener('change', moveTask);
    listItem.querySelector('input[type="checkbox"]').disabled = true
    
    let removeButton = document.createElement('button');
    removeButton.classList.add('btn-close')
    removeButton.classList.add('my-auto')
    removeButton.classList.add('ms-4')
    removeButton.addEventListener('click', () => {
        listItem.remove();
      
    });

    listItem.appendChild(removeButton);

    listItem.classList.add('text-secondary')
    complete.appendChild(listItem);
   
}

const currentLocation = document.getElementById('currentLocationList');
const previousLocation = document.getElementById('previousLocationList');

const findLocation = () => {
  const success = (position) => {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude + ' ' + longitude);
    const geoApiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;

    fetch(geoApiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let locationList = document.createElement('li');
        locationList.classList.add('nav-item');
        locationList.innerHTML = data.display_name;

        let removeButton = document.createElement('button');
        removeButton.classList.add('btn-close');
        removeButton.classList.add('my-auto');
        removeButton.classList.add('ms-4');
        removeButton.classList.add('bg-white');
        removeButton.addEventListener('click', (event) => {
         
          const listItem = event.target.closest('li');
          if (listItem) {
            listItem.remove();
         
          }
        });

        locationList.appendChild(removeButton);
        
        
        while (currentLocation.firstChild) {
          previousLocation.appendChild(currentLocation.firstChild);
        }

        currentLocation.appendChild(locationList);
        
      });
  
  };

  const error = () => {
    alert('Location Not Found');
  };

  navigator.geolocation.getCurrentPosition(success, error);
  
};
