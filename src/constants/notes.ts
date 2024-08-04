import { NoteData } from 'types';

import { Colors } from './colors';

const { GREEN, GREEN_LIGHT, ORANGE, PINK, PURPLE, YELLOW } = Colors;

export const NOTES: NoteData[] = [
  {
    id: 1,
    title: 'Стрелец A*',
    description:
      'Стрелец A* (лат. Sagittarius A*, Sgr A*; произносится «Стреле́ц А со звёздочкой») — компактный радиоисточник, находящийся в центре Млечного Пути, входит в состав радиоисточника #Стрелец А. Излучает также в инфракрасном, рентгеновском и других диапазонах. Представляет собой высокоплотный объект — сверхмассивную чёрную дыру[6][7][8], окружённую горячим радиоизлучающим газовым облаком диаметром около 1,8 пк[9]. Расстояние до радиоисточника составляет (27,00 ± 0,10) тыс. св. лет, масса центрального объекта равна (4,297 ± 0,042) млн M⊙[1][10]. Данные с радиотелескопа VLBA свидетельствуют, что непосредственно на долю самой чёрной дыры приходится минимум четверть от общей массы объекта Sgr A*, а остальная часть массы приходится на окружающую чёрную дыру материю, а также соседние с ней звёзды и облака газа[11].',
    tags: ['#Стрелец'],
    order: 1,
    color: GREEN_LIGHT,
    timestamp: Date.now() + 100,
  },
  {
    id: 2,
    title: 'Values we uphold Values we uphold Values we uphold Values we uphold Values we uphold Values we uphold',
    description:
      '#Modsen company’s policy is targeted at the integration of eco-initiatives at every stage of the software #development process to minimize the impact of future products on our #environment.\n At Modsen, we foster equality, collaboration, and mutual empowerment in the workplace. Making sure every team member knows one’s ideas and input is highly cherished is the key to maintaining a harmonious work environment.',
    tags: ['#Modsen', '#environment', '#development'],
    order: 1,
    color: PURPLE,
    timestamp: Date.now() + 200,
  },
  {
    id: 3,
    title: 'Стрелец A*',
    description:
      'Стрелец A* (лат. Sagittarius A*, Sgr A*; произносится «Стреле́ц А со звёздочкой») — компактный радиоисточник, находящийся в центре Млечного Пути, входит в состав радиоисточника Стрелец А. Излучает также в инфракрасном, рентгеновском и других диапазонах. Представляет собой высокоплотный объект — сверхмассивную чёрную дыру[6][7][8], окружённую горячим радиоизлучающим газовым облаком диаметром около 1,8 пк[9]. Расстояние до радиоисточника составляет (27,00 ± 0,10) тыс. св. лет, масса центрального объекта равна (4,297 ± 0,042) млн M⊙[1][10]. Данные с радиотелескопа VLBA свидетельствуют, что непосредственно на долю самой чёрной дыры приходится минимум четверть от общей массы объекта Sgr A*, а остальная часть массы приходится на окружающую чёрную дыру материю, а также соседние с ней звёзды и облака газа[11].',
    tags: [],
    order: 1,
    color: PINK,
    timestamp: Date.now() + 300,
  },
  {
    id: 4,
    title: 'Values we uphold',
    description:
      'Modsen company’s policy is targeted at the integration of eco-initiatives at every stage of the software development process to minimize the impact of future products on our environment.\n At Modsen, we foster equality, collaboration, and mutual empowerment in the workplace. Making sure every team member knows one’s ideas and input is highly cherished is the key to maintaining a harmonious work environment.',
    tags: [],
    order: 1,
    color: ORANGE,
    timestamp: Date.now() + 400,
  },
  {
    id: 5,
    title: 'Стрелец A*',
    description:
      'Стрелец A* (лат. Sagittarius A*, Sgr A*; произносится «Стреле́ц А со звёздочкой») — компактный радиоисточник, находящийся в центре Млечного Пути, входит в состав радиоисточника Стрелец А. Излучает также в инфракрасном, рентгеновском и других диапазонах. Представляет собой высокоплотный объект — сверхмассивную чёрную дыру[6][7][8], окружённую горячим радиоизлучающим газовым облаком диаметром около 1,8 пк[9]. Расстояние до радиоисточника составляет (27,00 ± 0,10) тыс. св. лет, масса центрального объекта равна (4,297 ± 0,042) млн M⊙[1][10]. Данные с радиотелескопа VLBA свидетельствуют, что непосредственно на долю самой чёрной дыры приходится минимум четверть от общей массы объекта Sgr A*, а остальная часть массы приходится на окружающую чёрную дыру материю, а также соседние с ней звёзды и облака газа[11].',
    tags: [],
    order: 1,
    color: YELLOW,
    timestamp: Date.now() + 500,
  },
  {
    id: 6,
    title: 'Values we uphold',
    description:
      '#Modsen company’s policy is targeted at the integration of eco-initiatives at every stage of the software development process to minimize the impact of future products on our environment.\n At Modsen, we foster equality, collaboration, and mutual empowerment in the workplace. Making sure every team member knows one’s ideas and input is highly cherished is the key to maintaining a harmonious work environment.',
    tags: ['#Modsen'],
    order: 1,
    color: GREEN,
    timestamp: Date.now() + 600,
  },
];
