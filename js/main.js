function formatCurrency(value) {
    return "$" + Number(value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function calculateAfterTax(amount, taxRate) {
    return amount * (1 - taxRate / 100);
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(function () {
        alert("Result copied.");
    }).catch(function () {
        alert("Could not copy the result.");
    });
}

function addAutoCalculate(inputIds, calculateFn) {
    inputIds.forEach(function (id) {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", calculateFn);
        }
    });
}

/* Hourly to Salary */
function calculateHourlyToSalary() {
    const hourlyRate = parseFloat(document.getElementById("hourlyRate")?.value);
    const hoursPerWeek = parseFloat(document.getElementById("hoursPerWeek")?.value);
    const weeksPerYear = parseFloat(document.getElementById("weeksPerYear")?.value);
    const taxRate = parseFloat(document.getElementById("hourlyTaxRate")?.value);

    if (
        isNaN(hourlyRate) ||
        isNaN(hoursPerWeek) ||
        isNaN(weeksPerYear) ||
        isNaN(taxRate) ||
        hourlyRate < 0 ||
        hoursPerWeek <= 0 ||
        weeksPerYear <= 0 ||
        taxRate < 0 ||
        taxRate > 100
    ) {
        return;
    }

    const annualSalary = hourlyRate * hoursPerWeek * weeksPerYear;
    const monthlySalary = annualSalary / 12;
    const weeklySalary = annualSalary / weeksPerYear;

    const annualAfterTax = calculateAfterTax(annualSalary, taxRate);
    const monthlyAfterTax = calculateAfterTax(monthlySalary, taxRate);
    const weeklyAfterTax = calculateAfterTax(weeklySalary, taxRate);

    document.getElementById("annualResult").textContent = formatCurrency(annualSalary);
    document.getElementById("annualAfterTaxResult").textContent = formatCurrency(annualAfterTax);
    document.getElementById("monthlyResult").textContent = formatCurrency(monthlySalary);
    document.getElementById("monthlyAfterTaxResult").textContent = formatCurrency(monthlyAfterTax);
    document.getElementById("weeklyResult").textContent = formatCurrency(weeklySalary);
    document.getElementById("weeklyAfterTaxResult").textContent = formatCurrency(weeklyAfterTax);
}

const calculateButton = document.getElementById("calculateButton");
const resetHourlyButton = document.getElementById("resetHourlyButton");
const copyHourlyButton = document.getElementById("copyHourlyButton");

if (calculateButton) {
    calculateButton.addEventListener("click", calculateHourlyToSalary);
    addAutoCalculate(["hourlyRate", "hoursPerWeek", "weeksPerYear", "hourlyTaxRate"], calculateHourlyToSalary);
}

if (resetHourlyButton) {
    resetHourlyButton.addEventListener("click", function () {
        document.getElementById("hourlyRate").value = "";
        document.getElementById("hoursPerWeek").value = "";
        document.getElementById("weeksPerYear").value = "52";
        document.getElementById("hourlyTaxRate").value = "20";
        document.getElementById("annualResult").textContent = "$0.00";
        document.getElementById("annualAfterTaxResult").textContent = "$0.00";
        document.getElementById("monthlyResult").textContent = "$0.00";
        document.getElementById("monthlyAfterTaxResult").textContent = "$0.00";
        document.getElementById("weeklyResult").textContent = "$0.00";
        document.getElementById("weeklyAfterTaxResult").textContent = "$0.00";
    });
}

if (copyHourlyButton) {
    copyHourlyButton.addEventListener("click", function () {
        copyText(
            "Annual Before Tax: " + document.getElementById("annualResult").textContent + "\n" +
            "Annual After Tax: " + document.getElementById("annualAfterTaxResult").textContent + "\n" +
            "Monthly Before Tax: " + document.getElementById("monthlyResult").textContent + "\n" +
            "Monthly After Tax: " + document.getElementById("monthlyAfterTaxResult").textContent + "\n" +
            "Weekly Before Tax: " + document.getElementById("weeklyResult").textContent + "\n" +
            "Weekly After Tax: " + document.getElementById("weeklyAfterTaxResult").textContent
        );
    });
}

/* Salary to Hourly */
function calculateSalaryToHourly() {
    const annualSalary = parseFloat(document.getElementById("annualSalaryInput")?.value);
    const hoursPerWeek = parseFloat(document.getElementById("salaryHoursPerWeek")?.value);
    const weeksPerYear = parseFloat(document.getElementById("salaryWeeksPerYear")?.value);
    const taxRate = parseFloat(document.getElementById("salaryTaxRate")?.value);

    if (
        isNaN(annualSalary) ||
        isNaN(hoursPerWeek) ||
        isNaN(weeksPerYear) ||
        isNaN(taxRate) ||
        annualSalary < 0 ||
        hoursPerWeek <= 0 ||
        weeksPerYear <= 0 ||
        taxRate < 0 ||
        taxRate > 100
    ) {
        return;
    }

    const totalHoursPerYear = hoursPerWeek * weeksPerYear;
    const hourlyPay = annualSalary / totalHoursPerYear;
    const hourlyPayAfterTax = calculateAfterTax(hourlyPay, taxRate);

    document.getElementById("hourlyPayResult").textContent = formatCurrency(hourlyPay);
    document.getElementById("hourlyPayAfterTaxResult").textContent = formatCurrency(hourlyPayAfterTax);
}

const salaryCalculateButton = document.getElementById("salaryCalculateButton");
const resetSalaryButton = document.getElementById("resetSalaryButton");
const copySalaryButton = document.getElementById("copySalaryButton");

if (salaryCalculateButton) {
    salaryCalculateButton.addEventListener("click", calculateSalaryToHourly);
    addAutoCalculate(["annualSalaryInput", "salaryHoursPerWeek", "salaryWeeksPerYear", "salaryTaxRate"], calculateSalaryToHourly);
}

if (resetSalaryButton) {
    resetSalaryButton.addEventListener("click", function () {
        document.getElementById("annualSalaryInput").value = "";
        document.getElementById("salaryHoursPerWeek").value = "";
        document.getElementById("salaryWeeksPerYear").value = "52";
        document.getElementById("salaryTaxRate").value = "20";
        document.getElementById("hourlyPayResult").textContent = "$0.00";
        document.getElementById("hourlyPayAfterTaxResult").textContent = "$0.00";
    });
}

if (copySalaryButton) {
    copySalaryButton.addEventListener("click", function () {
        copyText(
            "Hourly Pay Before Tax: " + document.getElementById("hourlyPayResult").textContent + "\n" +
            "Hourly Pay After Tax: " + document.getElementById("hourlyPayAfterTaxResult").textContent
        );
    });
}

/* Overtime */
function calculateOvertime() {
    const hourlyRate = parseFloat(document.getElementById("overtimeHourlyRate")?.value);
    const overtimeHours = parseFloat(document.getElementById("overtimeHours")?.value);
    const overtimeMultiplier = parseFloat(document.getElementById("overtimeMultiplier")?.value);
    const taxRate = parseFloat(document.getElementById("overtimeTaxRate")?.value);

    if (
        isNaN(hourlyRate) ||
        isNaN(overtimeHours) ||
        isNaN(overtimeMultiplier) ||
        isNaN(taxRate) ||
        hourlyRate < 0 ||
        overtimeHours < 0 ||
        overtimeMultiplier <= 0 ||
        taxRate < 0 ||
        taxRate > 100
    ) {
        return;
    }

    const overtimePay = hourlyRate * overtimeMultiplier * overtimeHours;
    const overtimePayAfterTax = calculateAfterTax(overtimePay, taxRate);

    document.getElementById("overtimePayResult").textContent = formatCurrency(overtimePay);
    document.getElementById("overtimePayAfterTaxResult").textContent = formatCurrency(overtimePayAfterTax);
}

const overtimeCalculateButton = document.getElementById("overtimeCalculateButton");
const resetOvertimeButton = document.getElementById("resetOvertimeButton");
const copyOvertimeButton = document.getElementById("copyOvertimeButton");

if (overtimeCalculateButton) {
    overtimeCalculateButton.addEventListener("click", calculateOvertime);
    addAutoCalculate(["overtimeHourlyRate", "overtimeHours", "overtimeMultiplier", "overtimeTaxRate"], calculateOvertime);
}

if (resetOvertimeButton) {
    resetOvertimeButton.addEventListener("click", function () {
        document.getElementById("overtimeHourlyRate").value = "";
        document.getElementById("overtimeHours").value = "";
        document.getElementById("overtimeMultiplier").value = "1.5";
        document.getElementById("overtimeTaxRate").value = "20";
        document.getElementById("overtimePayResult").textContent = "$0.00";
        document.getElementById("overtimePayAfterTaxResult").textContent = "$0.00";
    });
}

if (copyOvertimeButton) {
    copyOvertimeButton.addEventListener("click", function () {
        copyText(
            "Overtime Pay Before Tax: " + document.getElementById("overtimePayResult").textContent + "\n" +
            "Overtime Pay After Tax: " + document.getElementById("overtimePayAfterTaxResult").textContent
        );
    });
}

/* Work Hours */
function calculateWorkHours() {
    const hoursPerDay = parseFloat(document.getElementById("hoursPerDay")?.value);
    const daysWorked = parseFloat(document.getElementById("daysWorked")?.value);
    const hourlyRate = parseFloat(document.getElementById("workHourlyRate")?.value);
    const taxRate = parseFloat(document.getElementById("workTaxRate")?.value);

    if (
        isNaN(hoursPerDay) ||
        isNaN(daysWorked) ||
        isNaN(hourlyRate) ||
        isNaN(taxRate) ||
        hoursPerDay < 0 ||
        daysWorked < 0 ||
        hourlyRate < 0 ||
        taxRate < 0 ||
        taxRate > 100
    ) {
        return;
    }

    const totalHours = hoursPerDay * daysWorked;
    const totalPay = totalHours * hourlyRate;
    const totalPayAfterTax = calculateAfterTax(totalPay, taxRate);

    document.getElementById("totalHoursResult").textContent = totalHours.toFixed(2);
    document.getElementById("totalPayResult").textContent = formatCurrency(totalPay);
    document.getElementById("totalPayAfterTaxResult").textContent = formatCurrency(totalPayAfterTax);
}

const workHoursCalculateButton = document.getElementById("workHoursCalculateButton");
const resetWorkHoursButton = document.getElementById("resetWorkHoursButton");
const copyWorkHoursButton = document.getElementById("copyWorkHoursButton");

if (workHoursCalculateButton) {
    workHoursCalculateButton.addEventListener("click", calculateWorkHours);
    addAutoCalculate(["hoursPerDay", "daysWorked", "workHourlyRate", "workTaxRate"], calculateWorkHours);
}

if (resetWorkHoursButton) {
    resetWorkHoursButton.addEventListener("click", function () {
        document.getElementById("hoursPerDay").value = "";
        document.getElementById("daysWorked").value = "";
        document.getElementById("workHourlyRate").value = "";
        document.getElementById("workTaxRate").value = "20";
        document.getElementById("totalHoursResult").textContent = "0.00";
        document.getElementById("totalPayResult").textContent = "$0.00";
        document.getElementById("totalPayAfterTaxResult").textContent = "$0.00";
    });
}

if (copyWorkHoursButton) {
    copyWorkHoursButton.addEventListener("click", function () {
        copyText(
            "Total Hours: " + document.getElementById("totalHoursResult").textContent + "\n" +
            "Total Pay Before Tax: " + document.getElementById("totalPayResult").textContent + "\n" +
            "Total Pay After Tax: " + document.getElementById("totalPayAfterTaxResult").textContent
        );
    });
}

/* Weekly Pay */
function calculateWeeklyPay() {
    const hourlyRate = parseFloat(document.getElementById("weeklyHourlyRate")?.value);
    const hoursWorked = parseFloat(document.getElementById("weeklyHoursWorked")?.value);
    const taxRate = parseFloat(document.getElementById("weeklyTaxRate")?.value);

    if (
        isNaN(hourlyRate) ||
        isNaN(hoursWorked) ||
        isNaN(taxRate) ||
        hourlyRate < 0 ||
        hoursWorked < 0 ||
        taxRate < 0 ||
        taxRate > 100
    ) {
        return;
    }

    const weeklyPay = hourlyRate * hoursWorked;
    const weeklyPayAfterTax = calculateAfterTax(weeklyPay, taxRate);

    document.getElementById("weeklyPayBeforeResult").textContent = formatCurrency(weeklyPay);
    document.getElementById("weeklyPayAfterResult").textContent = formatCurrency(weeklyPayAfterTax);
}

const weeklyCalculateButton = document.getElementById("weeklyCalculateButton");
const resetWeeklyButton = document.getElementById("resetWeeklyButton");
const copyWeeklyButton = document.getElementById("copyWeeklyButton");

if (weeklyCalculateButton) {
    weeklyCalculateButton.addEventListener("click", calculateWeeklyPay);
    addAutoCalculate(["weeklyHourlyRate", "weeklyHoursWorked", "weeklyTaxRate"], calculateWeeklyPay);
}

if (resetWeeklyButton) {
    resetWeeklyButton.addEventListener("click", function () {
        document.getElementById("weeklyHourlyRate").value = "";
        document.getElementById("weeklyHoursWorked").value = "";
        document.getElementById("weeklyTaxRate").value = "20";
        document.getElementById("weeklyPayBeforeResult").textContent = "$0.00";
        document.getElementById("weeklyPayAfterResult").textContent = "$0.00";
    });
}

if (copyWeeklyButton) {
    copyWeeklyButton.addEventListener("click", function () {
        copyText(
            "Weekly Pay Before Tax: " + document.getElementById("weeklyPayBeforeResult").textContent + "\n" +
            "Weekly Pay After Tax: " + document.getElementById("weeklyPayAfterResult").textContent
        );
    });
}

/* Monthly Pay */
function calculateMonthlyPay() {
    const hourlyRate = parseFloat(document.getElementById("monthlyHourlyRate")?.value);
    const hoursPerWeek = parseFloat(document.getElementById("monthlyHoursPerWeek")?.value);
    const weeksPerMonth = parseFloat(document.getElementById("weeksPerMonth")?.value);
    const taxRate = parseFloat(document.getElementById("monthlyTaxRate")?.value);

    if (
        isNaN(hourlyRate) ||
        isNaN(hoursPerWeek) ||
        isNaN(weeksPerMonth) ||
        isNaN(taxRate) ||
        hourlyRate < 0 ||
        hoursPerWeek < 0 ||
        weeksPerMonth <= 0 ||
        taxRate < 0 ||
        taxRate > 100
    ) {
        return;
    }

    const monthlyPay = hourlyRate * hoursPerWeek * weeksPerMonth;
    const monthlyPayAfterTax = calculateAfterTax(monthlyPay, taxRate);

    document.getElementById("monthlyPayBeforeResult").textContent = formatCurrency(monthlyPay);
    document.getElementById("monthlyPayAfterResult").textContent = formatCurrency(monthlyPayAfterTax);
}

const monthlyCalculateButton = document.getElementById("monthlyCalculateButton");
const resetMonthlyButton = document.getElementById("resetMonthlyButton");
const copyMonthlyButton = document.getElementById("copyMonthlyButton");

if (monthlyCalculateButton) {
    monthlyCalculateButton.addEventListener("click", calculateMonthlyPay);
    addAutoCalculate(["monthlyHourlyRate", "monthlyHoursPerWeek", "weeksPerMonth", "monthlyTaxRate"], calculateMonthlyPay);
}

if (resetMonthlyButton) {
    resetMonthlyButton.addEventListener("click", function () {
        document.getElementById("monthlyHourlyRate").value = "";
        document.getElementById("monthlyHoursPerWeek").value = "";
        document.getElementById("weeksPerMonth").value = "4.33";
        document.getElementById("monthlyTaxRate").value = "20";
        document.getElementById("monthlyPayBeforeResult").textContent = "$0.00";
        document.getElementById("monthlyPayAfterResult").textContent = "$0.00";
    });
}

if (copyMonthlyButton) {
    copyMonthlyButton.addEventListener("click", function () {
        copyText(
            "Monthly Pay Before Tax: " + document.getElementById("monthlyPayBeforeResult").textContent + "\n" +
            "Monthly Pay After Tax: " + document.getElementById("monthlyPayAfterResult").textContent
        );
    });
}

/* Take-Home Pay */
function calculateTakeHomePay() {
    const grossPay = parseFloat(document.getElementById("grossPayInput")?.value);
    const taxRate = parseFloat(document.getElementById("takeHomeTaxRate")?.value);

    if (
        isNaN(grossPay) ||
        isNaN(taxRate) ||
        grossPay < 0 ||
        taxRate < 0 ||
        taxRate > 100
    ) {
        return;
    }

    const takeHomePay = calculateAfterTax(grossPay, taxRate);

    document.getElementById("grossPayBeforeResult").textContent = formatCurrency(grossPay);
    document.getElementById("takeHomeAfterResult").textContent = formatCurrency(takeHomePay);
}

const takeHomeCalculateButton = document.getElementById("takeHomeCalculateButton");
const resetTakeHomeButton = document.getElementById("resetTakeHomeButton");
const copyTakeHomeButton = document.getElementById("copyTakeHomeButton");

if (takeHomeCalculateButton) {
    takeHomeCalculateButton.addEventListener("click", calculateTakeHomePay);
    addAutoCalculate(["grossPayInput", "takeHomeTaxRate"], calculateTakeHomePay);
}

if (resetTakeHomeButton) {
    resetTakeHomeButton.addEventListener("click", function () {
        document.getElementById("grossPayInput").value = "";
        document.getElementById("takeHomeTaxRate").value = "20";
        document.getElementById("grossPayBeforeResult").textContent = "$0.00";
        document.getElementById("takeHomeAfterResult").textContent = "$0.00";
    });
}

if (copyTakeHomeButton) {
    copyTakeHomeButton.addEventListener("click", function () {
        copyText(
            "Gross Pay Before Tax: " + document.getElementById("grossPayBeforeResult").textContent + "\n" +
            "Take-Home Pay After Tax: " + document.getElementById("takeHomeAfterResult").textContent
        );
    });
}