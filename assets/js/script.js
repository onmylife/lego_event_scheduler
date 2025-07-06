document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYearDisplay = document.getElementById('currentMonthYear');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    let currentDate = new Date();

    // window.eventsData는 index.html에서 Liquid를 통해 주입됩니다.
    const events = window.eventsData || [];

    function renderCalendar(date) {
        // 기존 달력 내용 초기화 (헤더 제외)
        while (calendarGrid.children.length > 4) { // 4개는 헤더 요소들
            calendarGrid.removeChild(calendarGrid.lastChild);
        }

        const year = date.getFullYear();
        const month = date.getMonth(); // 0 (Jan) - 11 (Dec)

        currentMonthYearDisplay.textContent = `${year}년 ${month + 1}월`;

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDayDate = new Date(year, month, day);
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            // 날짜 셀
            const dateCell = document.createElement('div');
            dateCell.classList.add('grid-cell', 'date-cell');
            dateCell.textContent = `${day}일 (${currentDayDate.toLocaleDateString('ko-KR', { weekday: 'short' })})`;
            calendarGrid.appendChild(dateCell);

            // 판매처별 이벤트 셀
            const stores = ['lego_official', 'store_a', 'store_b'];
            stores.forEach(storeKey => {
                const eventCell = document.createElement('div');
                eventCell.classList.add('grid-cell', `event-cell-${storeKey}`);

                const dayEvents = events.find(e => e.date === dateString);
                if (dayEvents && dayEvents[storeKey]) {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event', `event-${storeKey.replace('_', '-')}`); // CSS 클래스용으로 변경
                    eventDiv.textContent = dayEvents[storeKey];
                    eventCell.appendChild(eventDiv);
                }
                calendarGrid.appendChild(eventCell);
            });
        }
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // 초기 달력 렌더링
    renderCalendar(currentDate);
});
