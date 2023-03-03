from django.contrib.auth import get_user_model
from .models import ClothItem, WeatherRecord

User = get_user_model()

DELTA_CLO = .5

WIND_ALPHA_TABLE = (
    (0, 7),
    (.6, 10.5),
    (1.8, 16.7),
    (3.5, 24.2),
    (5.3, 32.4),
    (7.5, 40.6),
    (9.9, 49.5),
    (12.5, 58.2),
    (15.3, 68.7),
    (18.3, 79),
    (21.6, 91),
    (25.2, 105),
    (29, 116.3)
)


WEAR_CLO = (
    (0.3, 'Трусы, футболка, шорты, легкие носки, сандалии'),
    (0.6, 'Мужская одежда: рубашка с короткими рукавами, легкие брюки, легкие носки, обувь.'
          'Женская одежда: Трусы, женское белье, чулки, платье, обувь'),
    (1.0, 'Мужская одежда: Трусы, рубашка, брюки, пиджак, носки, обувью'
          'Женская одежда: Трусы, чулки, блузка, длинная юбка, пиджак, обувь'),
    (1.3, 'Нижняя одежда с длинными рукавами и штанинами, рубашка, '
          'брюки, свитер, пиджак, носки, обувь'),
    (1.5, 'Нижняя одежда с короткими рукавами и штанинами, рубашка, '
          'брюки, жилет, пиджак, пальто, носки, обувь'),
    (2.0, 'Нижняя одежда с короткими рукавами и штанинами, '
          'рубашка, брюки, пиджак, '
          ' стеганая куртка и штаны, носки, обувь, шапка, перчатки'),
    (2.55, 'Нижняя одежда с длинными рукавами и штанинами, термозащитная куртка и брюки, '
           'парка (аляска) с тяжелой подбивкой, штаны с тяжелой подбивкой, носки, обувь, шапка, перчатки')
)


def get_alpha(wind_speed):
    l, r = -1, 12
    while r - l > 1:
        m = (r + l) // 2
        if WIND_ALPHA_TABLE[m][0] < wind_speed:
            l = m
        else:
            r = m
    return WIND_ALPHA_TABLE[r][1]


def get_general_wear_recomendation(CLO):
    l, r = -1, 6
    while r - l > 1:
        m = (r + l) // 2
        if CLO > WEAR_CLO[m][0]:
            l = m
        else:
            r = m
    return WEAR_CLO[r]


def get_user_recomendations(user_id, wr: WeatherRecord):
    user = User.objects.get(id=user_id)
    
    jackets = (
        ClothItem.objects.all()
        .filter(user=user)
        .filter(type=ClothItem.ClothTypes.JACKET)
        .order_by("thermal_resistance_min")
    )
    shirts = (
        ClothItem.objects.all()
        .filter(user=user)
        .filter(type=ClothItem.ClothTypes.SHIRTS)
        .order_by("thermal_resistance_min")
    )
    shoes = (
        ClothItem.objects.all()
        .filter(user=user)
        .filter(type=ClothItem.ClothTypes.SHOES)
        .order_by("thermal_resistance_min")
    )
    socks = (
        ClothItem.objects.all()
        .filter(user=user)
        .filter(type=ClothItem.ClothTypes.SOCKS)
        .order_by("thermal_resistance_min")
    )
    headgears = (
        ClothItem.objects.all()
        .filter(user=user)
        .filter(type=ClothItem.ClothTypes.HEADGEAR)
        .order_by("thermal_resistance_min")
    )
    pants = (
        ClothItem.objects.all()
        .filter(user=user)
        .filter(type=ClothItem.ClothTypes.PANTS)
        .order_by("thermal_resistance_min")
    )
    clo = wr.calculate_CLO()

    tops = []
    for j in jackets:
        for s in shirts:
            if abs(s.thermal_resistance_mean - clo) < DELTA_CLO:
                tops.append(s)
            if abs(j.thermal_resistance_mean + s.thermal_resistance_mean - clo) < DELTA_CLO:
                tops.append((j, s))
    
    feets = []
    for sck in socks:
        for sh in shoes:
            if abs(sck.thermal_resistance_mean + sh.thermal_resistance_mean - clo) < DELTA_CLO:
                feets.append((sck, sh))
    
    bottoms = []
    for p in pants:
        if abs(p.thermal_resistance_mean - clo) < DELTA_CLO:
            bottoms.append(p)

    heads = []
    for h in headgears:
        if abs(h.thermal_resistance_mean - clo) < DELTA_CLO:
            heads.append(h)
    
    return {
        "tops": tops,
        "bottoms": bottoms,
        "heads": heads,
        "feets": feets
    }
