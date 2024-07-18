angular.module('energyChartApp')
.controller('MainController', ['$scope', function($scope) {
    $scope.birthdate = '';

    $scope.calculate = function() {
        const birthdate = new Date($scope.birthdate);
        const day = birthdate.getDate();
        const month = birthdate.getMonth() + 1; // Months are zero-based
        const year = birthdate.getFullYear();

        const code = calculateEnergyCode(day, month, year);
        const ages = [];
        const energies = [];

        for (let i = 0; i < code.length; i++) {
            ages.push(17 + i);
            energies.push(parseInt(code.charAt(i)));
        }

        drawChart(ages, energies);
    };

    function calculateEnergyCode(day, month, year) {
        const codeStr = `${String(day).padStart(2, '0')}${String(month).padStart(2, '0')}`;
        const code = parseInt(codeStr) * year;
        return String(code);
    }

    function drawChart(ages, energies) {
        const ctx = document.getElementById('energyChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ages,
                datasets: [{
                    label: 'Energy Levels',
                    data: energies,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true,
                        max: 9
                    }
                }
            }
        });
    }
}]);
