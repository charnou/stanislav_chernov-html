window.addEventListener('load', () => {
  //CALENDAR
  const calendar = document.createElement('div');
  calendar.className = 'calendar';
  document.body.appendChild(calendar);
  const calendarMonth = document.createElement('span');
  calendarMonth.className = 'calendar__month';
  calendar.appendChild(calendarMonth);
  const calendarYear = document.createElement('span');
  calendarYear.className = 'calendar__year';
  calendar.appendChild(calendarYear);
  const calendarPrevMonth = document.createElement('div');
  calendarPrevMonth.className = 'calendar__prev-month';
  calendar.appendChild(calendarPrevMonth).innerHTML = '∟';
  const calendarNextMonth = document.createElement('div');
  calendarNextMonth.className = 'calendar__next-month';
  calendar.appendChild(calendarNextMonth).innerHTML = '∟';
  const calendarWeek = document.createElement('div');
  calendarWeek.className = 'calendar__week';
  calendar.appendChild(calendarWeek);
  let week;
  for (let i = 0; i < 7; i++) {
    (i == 0) ? week = 'Mo':
      (i == 1) ? week = 'Tu' :
      (i == 2) ? week = 'We' :
      (i == 3) ? week = 'Th' :
      (i == 4) ? week = 'Fr' :
      (i == 5) ? week = 'Sa' :
      week = 'Su';
    let w = document.createElement('div');
    calendarWeek.appendChild(w).innerHTML = week;
  }

  let time = new Date().getTime();

  let monthToChange = true;

  function nextMonth() {
    if (monthToChange) {
      time = new Date(time).setMonth(new Date(time).getMonth() + 1);
    } else {
      time = new Date(time).setFullYear(new Date(time).getFullYear() + 1);
    }
    time = new Date(time).setDate(1);
  }

  function prevMonth() {
    if (monthToChange) {
      time = new Date(time).setMonth(new Date(time).getMonth() - 1);
    } else {
      time = new Date(time).setFullYear(new Date(time).getFullYear() - 1);
    }
    time = new Date(time).setDate(1);
  }

  calendarMonth.addEventListener('click', () => {
    monthToChange = true;
    monthOrYearIsChanging();
  })

  calendarYear.addEventListener('click', () => {
    monthToChange = false;
    monthOrYearIsChanging();
  })

  function monthOrYearIsChanging() {
    if (monthToChange) {
      calendarMonth.classList.add('calendar__month--active');
      calendarYear.classList.remove('calendar__year--active');
    } else if (!monthToChange) {
      calendarMonth.classList.remove('calendar__month--active');
      calendarYear.classList.add('calendar__year--active');
    }
  }
  monthOrYearIsChanging();

  function isLeapYear() {
    let isLeapYear = new Date(time).getFullYear();
    if (isLeapYear % 4 == 0) {
      if (isLeapYear % 100 == 0) {
        if (isLeapYear % 400 == 0) {
          isLeapYear = true;
        } else {
          isLeapYear = false;
        }
      } else {
        isLeapYear = true;
      }
    } else {
      isLeapYear = false;
    }
    return isLeapYear;
  }

  function daysInMonth(month) {
    let daysInMonth;
    if (month == 0) {
      daysInMonth = 31;
    } else if (month == 1) {
      if (isLeapYear() == true) {
        daysInMonth = 29;
      } else {
        daysInMonth = 28
      }
    } else if (month == 2) {
      daysInMonth = 31;
    } else if (month == 3) {
      daysInMonth = 30;
    } else if (month == 4) {
      daysInMonth = 31;
    } else if (month == 5) {
      daysInMonth = 30;
    } else if (month == 6) {
      daysInMonth = 31;
    } else if (month == 7) {
      daysInMonth = 31;
    } else if (month == 8) {
      daysInMonth = 30;
    } else if (month == 9) {
      daysInMonth = 31;
    } else if (month == 10) {
      daysInMonth = 30;
    } else if (month == 11) {
      daysInMonth = 31;
    }
    return daysInMonth;
  }

  function monthToString(month) {
    let monthToString;
    (month == 0) ? monthToString = 'January':
      (month == 1) ? monthToString = 'February' :
      (month == 2) ? monthToString = 'March' :
      (month == 3) ? monthToString = 'April' :
      (month == 4) ? monthToString = 'May' :
      (month == 5) ? monthToString = 'June' :
      (month == 6) ? monthToString = 'July' :
      (month == 7) ? monthToString = 'August' :
      (month == 8) ? monthToString = 'September' :
      (month == 9) ? monthToString = 'October' :
      (month == 10) ? monthToString = 'November' :
      (month == 11) ? monthToString = 'December' :
      month = NaN;
    return monthToString;
  }

  function deleteDates() {
    document.querySelectorAll('.calendar__grid-item').forEach(n => n.remove())
    document.querySelectorAll('.calendar__grid-item--grey').forEach(n => n.remove())
  }

  function updateDate() {
    let updateDate = monthToString(new Date(time).getMonth());
    calendarMonth.innerHTML = updateDate;
    calendarYear.innerHTML = new Date(time).getFullYear();
  }

  const calendarGrid = document.createElement('div');
  calendarGrid.className = 'calendar__grid';
  calendar.appendChild(calendarGrid);

  function prevDates() {
    let prevDates = new Date(time).setMonth(new Date(time).getMonth() - 1);
    prevDates = new Date(prevDates).setDate(daysInMonth(new Date(prevDates).getMonth()))
    let length = new Date(time).getDay();
    (length == 0) ? length = 6: length--;
    for (; length != 0; length--) {
      let dates = document.createElement('div');
      dates.className = 'calendar__grid-item calendar__grid-item--grey';
      dates.addEventListener('click', () => {
        monthToChange = true;
        monthOrYearIsChanging();
      });
      dates.addEventListener('click', prevMonth);
      dates.addEventListener('click', updateDate);
      dates.addEventListener('click', deleteDates);
      dates.addEventListener('click', drawDates);
      calendarGrid.insertBefore(dates, calendarGrid.firstChild).innerHTML = new Date(prevDates).getDate();
      prevDates = new Date(prevDates).setDate(new Date(prevDates).getDate() - 1);
    }
  }

  function mainDates() {
    for (let i = 1; i <= daysInMonth(new Date(time).getMonth()); i++) {
      let dates = document.createElement('div');
      dates.className = 'calendar__grid-item';

      dates.addEventListener('click', (event) => {
        let target = event.target;
        highlightDate(target);
      });

      calendarGrid.appendChild(dates).innerHTML = i;
      if (i == (new Date().getDate()) &&
        (new Date(time).getMonth() == new Date().getMonth()) &&
        (new Date(time).getFullYear() == (new Date().getFullYear()))) {
        dates.classList.add('calendar__grid-item--current');
      }
    }
  }

  function nextDates(length) {
    for (let i = 1; i <= 42 - length; i++) {
      let dates = document.createElement('div');
      dates.className = 'calendar__grid-item calendar__grid-item--grey';
      dates.addEventListener('click', () => {
        monthToChange = true;
        monthOrYearIsChanging();
      });
      dates.addEventListener('click', nextMonth);
      dates.addEventListener('click', updateDate);
      dates.addEventListener('click', deleteDates);
      dates.addEventListener('click', drawDates);
      calendarGrid.appendChild(dates).innerHTML = i;
    }
  }

  function isWeekend() {
    for (let i = 0; i < 42; i++) {
      if (i % 7 == 0 + 5 || i % 7 == 0 + 6) {
        let weekend = document.querySelectorAll('.calendar__grid-item')
        weekend[i].classList.add('calendar__grid-item--weekend')
      }
    }
  }

  function drawDates() {
    prevDates();
    mainDates();
    nextDates(calendarGrid.childElementCount);
    isWeekend();
  }

  let isDateHighlighted = 0;
  function showTasks() {
    if (isDateHighlighted) {
      tasks.classList.add('tasks--highlight');
      tasksTitle.classList.add('tasks__title--active');
      tasksAddTask.classList.add('tasks__plus-item--active');
    } else if (isDateHighlighted == false) {
      tasks.classList.remove('tasks--highlight');
      tasksTitle.classList.remove('tasks__title--active');
      tasksAddTask.classList.remove('tasks__plus-item--active');
    }
  }

  function highlightDate(target) {
    let dates = document.querySelectorAll('.calendar__grid-item');
    for (let date of dates) {
      if (date == target && date.classList.contains('calendar__grid-item--highlight')) {
        date.classList.remove('calendar__grid-item--highlight');
        isDateHighlighted = 0;
        showTasks();
        return;}
      date.classList.remove('calendar__grid-item--highlight');
    }
    target.classList.add('calendar__grid-item--highlight');
    isDateHighlighted = 1;
    showTasks();
  }

  function changePageTitle() {
    document.title = monthToString(new Date(time).getMonth()) + ' ' + new Date(time).getFullYear();
    setTimeout(() => {
      document.title = 'Calendar';
    }, 1000);
  }

  calendarPrevMonth.addEventListener('click', prevMonth);
  calendarPrevMonth.addEventListener('click', updateDate);
  calendarPrevMonth.addEventListener('click', deleteDates);
  calendarPrevMonth.addEventListener('click', drawDates);
  calendarPrevMonth.addEventListener('click', changePageTitle);

  calendarNextMonth.addEventListener('click', nextMonth);
  calendarNextMonth.addEventListener('click', updateDate);
  calendarNextMonth.addEventListener('click', deleteDates);
  calendarNextMonth.addEventListener('click', drawDates);
  calendarNextMonth.addEventListener('click', changePageTitle);

  prevMonth();
  nextMonth();
  updateDate();
  drawDates();
  // ./CALENDAR

  //BACKGROUND AND START BUTTON
  const background = document.createElement('div');
  background.className = 'background';
  document.body.insertBefore(background, document.body.firstChild);
  const backgroundItem1 = document.createElement('div');
  backgroundItem1.className = 'background__item-1';
  background.appendChild(backgroundItem1);
  const tasks = document.createElement('div');
  tasks.className = 'tasks';
  background.appendChild(tasks);
  const tasksTitle = document.createElement('p');
  tasksTitle.className = 'tasks__title';
  tasks.appendChild(tasksTitle).innerHTML = 'Your Tasks';
  const tasksAddTask = document.createElement('div');
  tasksAddTask.className = 'tasks__plus-item';
  tasks.appendChild(tasksAddTask).innerHTML = '+';
  const backgroundItem2 = document.createElement('div');
  backgroundItem2.className = 'background__item-2';
  background.appendChild(backgroundItem2);
  const backgroundLine = document.createElement('div');
  backgroundLine.className = 'background__line';
  background.appendChild(backgroundLine);
  const backgroundNameItem = document.createElement('div');
  backgroundNameItem.className = 'background__name-item';
  background.appendChild(backgroundNameItem);
  const backgroundName = document.createElement('div');
  backgroundName.className = 'background__name';
  backgroundNameItem.appendChild(backgroundName).innerHTML = 'Stanislav Chernov';
  const backgroundTitle = document.createElement('div');
  backgroundTitle.className = 'background__title';
  background.appendChild(backgroundTitle).innerHTML = 'Calendar';

  const startBtn = document.createElement('div');
  startBtn.className = 'start-btn';
  document.body.appendChild(startBtn).innerHTML = 'Start';
  const startBorder1 = document.createElement('span');
  startBorder1.className = 'start__border1';
  startBtn.appendChild(startBorder1);
  const startBorder2 = document.createElement('span');
  startBorder2.className = 'start__border2';
  startBtn.appendChild(startBorder2);
  const startBorder3 = document.createElement('span');
  startBorder3.className = 'start__border3';
  startBtn.appendChild(startBorder3);
  const startBorder4 = document.createElement('span');
  startBorder4.className = 'start__border4';
  startBtn.appendChild(startBorder4);

  function backgroundAnimation() {
    setTimeout(() => {
      background.classList.toggle('background--loaded');
    }, 1000);
    setTimeout(() => {
      backgroundItem1.style.width = '26.2rem';
    }, 600);
    setTimeout(() => {
      backgroundItem1.classList.toggle('background__item-1--loaded');
    }, 1200);
    setTimeout(() => {
      tasks.style.width = '35rem';
    }, 600);
    setTimeout(() => {
      tasks.classList.toggle('tasks--loaded');
    }, 1200);
    setTimeout(() => {
      backgroundLine.classList.toggle('background__line--loaded');
    }, 1800);
    setTimeout(() => {
      backgroundNameItem.classList.toggle('background__name-item--loaded');
    }, 2400);
    setTimeout(() => {
      backgroundItem2.classList.toggle('background__item-2--loaded');
    }, 2400);
    setTimeout(() => {
      backgroundTitle.classList.toggle('background__title--loaded');
    }, 2400);
  }

  function backgroundNameMouseOver() {
    backgroundNameItem.classList.toggle('background__name-item--hover');
    setTimeout(() => {
      backgroundName.classList.toggle('background__name--hover');
    }, 200);
  }

  function backgroundNameMouseOut() {
    backgroundNameItem.classList.toggle('background__name-item--hover');
    backgroundName.classList.toggle('background__name--hover');
  }

  function startBtnMouseOver() {
    startBtn.classList.toggle('start-btn--hover');
    startBorder1.classList.toggle('start__border1--hover');
    startBorder2.classList.toggle('start__border2--hover');
    startBorder3.classList.toggle('start__border3--hover');
    startBorder4.classList.toggle('start__border4--hover');

    setTimeout(() => {
      startBorder1.classList.toggle('start__border1--hover');
      startBorder2.classList.toggle('start__border2--hover');
      startBorder3.classList.toggle('start__border3--hover');
      startBorder4.classList.toggle('start__border4--hover');
    }, 700);
  }

  function startBtnMouseOut() {
    startBtn.classList.toggle('start-btn--hover');
  }

  function startBtnMouseClick() {
    startBtn.style.transition = 'color 0.01s';
    startBtn.style.color = '#fff0b5';

    setTimeout(() => {
      startBtn.style.color = '#ffd321';
    }, 70);

    setTimeout(() => {
      startBtn.style.transition = 'opacity 0.4s';
      startBtn.style.opacity = '0';
    }, 200);

    setTimeout(() => {
      startBtn.remove();
    }, 1000);

    setTimeout(() => {
      calendar.style.display = 'block';
    }, 2300);
  }

  function calendarDisplay() {
    setTimeout(() => {
      calendar.classList.toggle('calendar--loaded');
      document.title = 'Calendar';
    }, 2400);
  }

  backgroundNameItem.addEventListener('mouseover', backgroundNameMouseOver);
  backgroundNameItem.addEventListener('mouseout', backgroundNameMouseOut);

  startBtn.addEventListener('mouseover', startBtnMouseOver);
  startBtn.addEventListener('mouseout', startBtnMouseOut);
  startBtn.addEventListener('click', startBtnMouseClick);
  startBtn.addEventListener('click', backgroundAnimation);
  startBtn.addEventListener('click', calendarDisplay);
  // ./BACKGROUND AND START BUTTON
});