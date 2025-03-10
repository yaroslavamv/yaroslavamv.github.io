class Fact {
	readonly year: number;
	readonly text: string;
	constructor(year: number, text: string) {
		this.year = year;
		this.text = text;
	}
}

class FactSet {
	readonly name: string;
	readonly yearStart: number;
	readonly yearEnd: number;
	readonly facts: readonly Fact[];
	constructor(name: string, yearStart: number, yearEnd: number, ...facts: readonly Fact[]) {
		this.name = name;
		this.yearStart = yearStart;
		this.yearEnd = yearEnd;
		this.facts = facts;
	}
}

const facts: readonly FactSet[] = [
	new FactSet(
		'Технологии', 1980, 1986,
		new Fact(1980, 'Sinclair Research выпускает домашний компьютер ZX80'),
		new Fact(1982, 'В Германии общественности представлены первые компакт-диски (CD)'),
		new Fact(1983, 'ARPANET меняет основной протокол с NCP на TCP/IP, что привело к появлению современного интернета'),
		new Fact(1985, 'Зарегистрированы первые домены верхнего уровня: .arpa, .com, .edu, .gb, .gov, .mil, .net, .org, .us.'),
		new Fact(1986, 'Компания IBM выпустила первый в мире лэптоп IBM PC Convertible'),
	),
	new FactSet(
		'Кино', 1987, 1991,
		new Fact(1987, '«Хищник»/Predator, США (реж. Джон Мактирнан)'),
		new Fact(1988, '«Кто подставл кролика Роджера»/WhoFramed Roger Rabbit, США (реж. Роберт Земекис)'),
		new Fact(1989, '«Назад в будущее 2»/Back To The Future 2, США (реж. Роберт Земекис)'),
		new Fact(1990, '«Крепкий орешек 2»/Die Hard 2, США (реж. Ренни Харлин)'),
		new Fact(1991, '«Семейка Аддамс»/The Addams Family, США (реж. Барри Зонненфельд)'),
	),
	new FactSet(
		'Литература', 1992, 1997,
		new Fact(1992, 'Нобелевская премия по литературе — Дерек Уолкотт, «За блестящий образец карибского эпоса в 64 разделах»'),
		new Fact(1994, '«Бессонница» — роман Стивена Кинга'),
		new Fact(1995, 'Нобелевская премия по литературе — Шеймас Хини'),
		new Fact(1997, '«Гарри Поттер и Философский камень» — Джоан Роулинг'),
	),
	new FactSet(
		'Театр', 1999, 2004,
		new Fact(1999, 'Премьера балета «Золушка» в постановке Жан-Кристофа Майо, сценография Эрнеста Пиньона'),
		new Fact(2000, 'Возобновлено издание журнала «Театр»'),
		new Fact(2002, 'Премьера трилогии Тома Стоппарда «Берег Утопии», Королевский Национальный театр, Лондон'),
		new Fact(2003, 'Открытие театра «Ла Фениче» в Венеции после восьмилетней реставрации из-за пожара'),
		new Fact(2004, 'Премьера спектакля «Последние страницы из дневника женщины» в Театре на покровке'),
	),
	new FactSet(
		'Спорт', 2006, 2014,
		new Fact(2006, 'Баскетбольный клуб ЦСКА стал победителем национального первенства России'),
		new Fact(2008, 'С 8 по 24 августа в Пекине прошли 29-е летние Олимпийские игры'),
		new Fact(2010, '13 – 28 февраля в Ванкувере: Зимние Олимпийские игры 2010 года'),
		new Fact(2012, '2 августа — Летние Олимпийские игры'),
		new Fact(2014, 'XXII зимние Олимпийские игры (Сочи, Россия)'),
	),
	new FactSet(
		'Наука', 2015, 2022,
		new Fact(2015, '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды'),
		new Fact(2016, 'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11'),
		new Fact(2017, 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi'),
		new Fact(2018, 'Старт космического аппарата Solar Probe Plus, предназначенного для изучения Солнца'),
		new Fact(2019, 'Google объявила о создании 53-кубитного квантового компьютера'),
		new Fact(2020, 'Корабль Crew Dragon вернулся на Землю после первого полета с астронавтами'),
		new Fact(2022, 'Расшифрована древнейшая в мире буквенная надпись, написанная на ханаанском языке'),
	),
];

export default facts;