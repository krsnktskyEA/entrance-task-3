<h5><a id="_3_______0"></a><em>Задание 3 — реализовать алгоритм работы «умного дома»</em></h5>
<h6><em>https://github.com/yandex-shri-2018/entrance-task-3-2</em></h6>
<hr>
<p><em><code>cd task-3</code></em><br>
<em><code>yarn install</code></em><br>
<em><code>yarn start</code></em></p>
<h6><a id="_____dataoutputjson_2"></a><em>результат работы алгоритма лежит в <code>data/output.json</code></em></h6>
<hr>
<h6><a id="0______inputjson__datainputjson_7"></a><em>0 шаг - читаем входной файл <code>input.json</code> из <code>data/input.json</code></em></h6>
<hr>
<h6><a id="1____________9"></a><em>1 шаг - создадим заготовку объекта содержащего пока пустое расписание работы приборов.</em></h6>
<hr>
<blockquote>
<p>“0”: [0, “night”, 1.79],<br>
“1”: [1, “night”, 1.79],<br>
“2”: [2, “night”, 1.79],<br>
“3”: [3, “night”, 1.79],<br>
“4”: [4, “night”, 1.79],<br>
“5”: [5, “night”, 1.79],<br>
“6”: [6, “night”, 1.79],<br>
“7”: [7, “day”, 6.46],<br>
“8”: [8, “day”, 6.46],<br>
“9”: [9, “day”, 6.46],<br>
“10”: [10, “day”, 5.38],<br>
“11”: [11, “day”, 5.38],<br>
“12”: [12, “day”, 5.38],<br>
“13”: [13, “day”, 5.38],<br>
“14”: [14, “day”, 5.38],<br>
“15”: [15, “day”, 5.38],<br>
“16”: [16, “day”, 5.38],<br>
“17”: [17, “day”, 6.46],<br>
“18”: [18, “day”, 6.46],<br>
“19”: [19, “day”, 6.46],<br>
“20”: [20, “day”, 6.46],<br>
“21”: [21, “night”, 5.38],<br>
“22”: [22, “night”, 5.38],<br>
“23”: [23, “night”, 1.79]</p>
</blockquote>
<h6><a id="2____________38"></a><em>2 шаг - В расписании пометим часы в которых приборам разрешено/запрещено работать.</em></h6>
<hr>
<blockquote>
<p>“0”: [0, “night”, 1.79, “allow”, “deny”, “allow”, “allow”, “allow”],<br>
“1”: [1, “night”, 1.79, “allow”, “deny”, “allow”, “allow”, “allow”],<br>
“2”: [2, “night”, 1.79, “allow”, “deny”, “allow”, “allow”, “allow”],<br>
“3”: [3, “night”, 1.79, “allow”, “deny”, “allow”, “allow”, “allow”],<br>
“4”: [4, “night”, 1.79, “allow”, “deny”, “allow”, “allow”, “allow”],<br>
“5”: [5, “night”, 1.79, “allow”, “deny”, “allow”, “allow”, “allow”],<br>
“6”: [6, “night”, 1.79, “allow”, “deny”, “allow”, “allow”, “allow”],<br>
“7”: [7, “day”, 6.46, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“8”: [8, “day”, 6.46, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“9”: [9, “day”, 6.46, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“10”: [10, “day”, 5.38, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“11”: [11, “day”, 5.38, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“12”: [12, “day”, 5.38, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“13”: [13, “day”, 5.38, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“14”: [14, “day”, 5.38, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“15”: [15, “day”, 5.38, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“16”: [16, “day”, 5.38, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“17”: [17, “day”, 6.46, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“18”: [18, “day”, 6.46, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“19”: [19, “day”, 6.46, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“20”: [20, “day”, 6.46, “deny”, “allow”, “allow”, “allow”, “allow”],<br>
“21”: [21, “night”, 5.38, “allow”, “deny”, “allow”, “allow”, “allow”],<br>
“22”: [22, “night”, 5.38, “allow”, “deny”, “allow”, “allow”, “allow”],<br>
“23”: [23, “night”, 1.79, “allow”, “deny”, “allow”, “allow”, “allow”]</p>
</blockquote>
<h6><a id="3____________rate____67"></a><em>3 шаг - Получим все возможные значения часов начала работы и суммарный rate для каждого варианта.</em></h6>
<hr>
<blockquote>
<p>{“0”: 5.37, “1”: 5.37, “2”: 5.37, “3”: 5.37, … и. тд.},<br>
{“7”: 12.92, “8”: 12.92, “9”: 11.84, “10”: 10.76, … и. тд.},<br>
{“0”: 107.95, “1”: 107.96, “2”: 107.96, “3”: 107.96, … и. тд.},<br>
{“0”: 107.95, “1”: 107.96, “2”: 107.96, “3”: 107.96, … и. тд.},<br>
{“0”: 1.79, “1”: 1.79, “2”: 1.79, “3”: 1.79, … и. тд.}</p>
</blockquote>
<h6><a id="4____________77"></a><em>4 шаг - Получим все варианты суммарной стоимости суточной работы каждого прибора.</em></h6>
<hr>
<blockquote>
<p>“0”: [{“0”: “5.1015”}, {“1”: “5.1015”}, {“2”: “5.1015”}, … и. тд.],<br>
“1”: [{“13”: “21.5200”}, {“10”: “21.5200”}, {“11”: “21.5200”}, … и. тд.],<br>
“2”: [{“12”: “5.3980”}, {“0”: “5.3980”}, {“2”: “5.3980”}, … и. тд.],<br>
“3”: [{“12”: “5.3980”}, {“0”: “5.3980”}, {“2”: “5.3980”}, … и. тд.],<br>
“4”: [{“0”: “1.5215”}, {“23”: “1.5215”}, {“2”: “1.5215”}, … и. тд.]</p>
</blockquote>
<h6><a id="5_______86"></a><em>5 шаг - Составим и проверим расписание</em></h6>
<hr>
<blockquote>
<p>“0”: [0, 950, 3, 5.1015, “Посудомоечная машина”, “F97…”],<br>
“1”: [13, 2000, 2, 21.52, “Духовка”, “C51…”],<br>
“2”: [12, 50, 24, 5.398, “Холодильник”, “02D…”],<br>
“3”: [12, 50, 24, 5.398, “Термостат”, “1E6…”],<br>
“4”: [0, 850, 1, 1.5215, “Кондиционер”, “7D9…”]</p>
</blockquote>
<blockquote>
<p>“0”: [950, “deny”, 50, 50, 850],<br>
“1”: [950, “deny”, 50, 50, “allow”],<br>
“2”: [950, “deny”, 50, 50, “allow”],<br>
“3”: [“allow”, “deny”, 50, 50, “allow”],<br>
“4”: [“allow”, “deny”, 50, 50, “allow”],<br>
“5”: [“allow”, “deny”, 50, 50, “allow”],<br>
“6”: [“allow”, “deny”, 50, 50, “allow”],<br>
“7”: [“deny”, “allow”, 50, 50, “allow”],<br>
“8”: [“deny”, “allow”, 50, 50, “allow”],<br>
“9”: [“deny”, “allow”, 50, 50, “allow”],<br>
“10”: [“deny”, “allow”, 50, 50, “allow”],<br>
“11”: [“deny”, “allow”, 50, 50, “allow”],<br>
“12”: [“deny”, “allow”, 50, 50, “allow”],<br>
“13”: [“deny”, 2000, 50, 50, “allow”],<br>
“14”: [“deny”, 2000, 50, 50, “allow”],<br>
“15”: [“deny”, “allow”, 50, 50, “allow”],<br>
“16”: [“deny”, “allow”, 50, 50, “allow”],<br>
“17”: [“deny”, “allow”, 50, 50, “allow”],<br>
“18”: [“deny”, “allow”, 50, 50, “allow”],<br>
“19”: [“deny”, “allow”, 50, 50, “allow”],<br>
“20”: [“deny”, “allow”, 50, 50, “allow”],<br>
“21”: [“allow”, “deny”, 50, 50, “allow”],<br>
“22”: [“allow”, “deny”, 50, 50, “allow”],<br>
“23”: [“allow”, “deny”, 50, 50, “allow”]</p>
</blockquote>
<h6><a id="6______120"></a><em>6 шаг - Окончательно оформим расписание</em></h6>
<hr>
<p><em><code>см. data/output.json</code></em></p>
<h6><a id="7______outputjson_124"></a><em>7 шаг - записываем результат в <code>output.json</code></em></h6>
<hr>