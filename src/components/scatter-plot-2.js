AFRAME.registerComponent('scatter-plot-2', {
    schema: {
        size: { type: 'number', default: 3 },
        radius: { type: 'number', default: 0.02 },
        color: { type: 'color', default: '#FFF' },
        textColor: { type: 'color', default: '#000000' },
        title: {type: 'string', default: 'no name'}
    },

    init: function () {
        var data = this.data;
        var entity = this.el;
        var object = this.el.object3D

        var salary = [335.6, 334.7, 338.4, 305.1, 376.5, 303.8, 253.6, 284.5, 330.8, 294.1, 331.8, 508.6, 369.8, 344.6, 255.1, 383.8, 319.3, 337.1, 431.9, 373.2, 272.2, 285.9, 282.4, 311.9, 257.5, 343.8, 251, 249, 290, 282.1, 274.4, 244.1, 276.4, 279.3, 265.8, 240.4, 254.4, 254.9, 297.6, 242, 249.8, 259.2, 259.1, 258.4, 266.7, 242.4, 280.8, 264.7, 279.6, 256.9, 268.8, 272.4, 264.8, 293.5, 273.1, 280.5, 258, 280.5, 249.7, 263.3, 269.8, 253.9, 249.3, 237.1, 242, 256.3, 294.5, 240.8, 275, 263.5, 228.9, 242.4, 273.8, 238.8, 264.3, 249.7, 272.2, 242, 283.5, 255.4, 254.9, 244.7, 250.1, 256.8, 270.1, 251.8, 263.4, 256.6, 254.2, 345.7, 242, 240.3, 243.1, 313.5, 294.7, 263.1, 256.9, 254.3, 273.1, 243.6, 256.3, 249.8, 235.2, 241.6, 244.6, 248.8, 282.7, 246.8, 275.6, 300.8, 265.5, 263.9, 261.8, 251.6, 285.3, 252, 246.6, 271.9, 256.9, 262.3, 285.9, 340, 335.1, 321.4, 311.2, 313.9, 308.5, 274.7, 282.3, 250.9, 255.6, 227.2, 239.3, 289.7, 324.2, 262.4, 293.8, 261.4, 251.2, 264, 261.3, 232.7, 229.7, 265.5, 264.2, 251.8, 255.9, 251.5, 262.5, 245.6, 289, 319.3, 311.2, 270, 270, 246.8, 264.7, 266.9, 285.9, 270.5, 267.9, 235.8, 261.6, 275.6, 278.7, 260, 254, 261.1, 224.5, 237.9, 249.9, 314.2, 234.3, 255.4, 251.3, 218.5, 272.3, 246.8, 230.2, 244.4, 247.3, 237.6, 271.8, 257.1, 248.8, 236.3, 270.2, 270.7, 267.6, 262.6, 258.3, 252.5, 257.8, 259.1, 288.4, 256.6, 261, 254.3, 239.6, 249.7, 264.5, 267, 239.2, 244.5, 267.7, 281.3, 261.2, 272.7, 255.5, 257.9, 263.5, 244.8, 261.8, 241.8, 245.4, 242.7, 276.5, 265.9, 251.6, 246.1, 263.3, 250.9, 267.5, 255.8, 287.6, 246.1, 246.1, 277.6, 238.5, 234.8, 267.8, 237.4, 252, 237.2, 246.8, 270.4, 252.7, 234.7, 246.6, 251.9, 250.5, 265.1, 244.2, 240.6, 237.9, 264.3, 235.7, 235.3, 277.7, 258.7, 272.6, 260.6, 260.9, 261.4, 250.2, 263.8, 246, 306.2, 254.4, 285.3, 279.6, 272.4, 233.3, 309.7]
        var population = [33175, 44130, 43444, 76453, 27753, 110003, 91925, 88037, 47304, 27614, 10660, 32888, 71848, 949761, 96032, 101231, 49424, 79707, 47185, 11831, 60808, 47146, 28109, 21083, 9402, 18064, 13854, 20930, 219914, 43797, 21927, 9180, 11019, 55467, 12008, 16864, 34133, 104709, 35045, 5343, 3733, 9882, 5453, 11631, 21577, 7920, 158520, 140927, 14521, 43549, 27019, 9733, 7328, 11845, 13840, 137481, 31178, 34206, 11496, 27415, 17416, 18894, 9561, 8806, 12451, 20026, 17148, 10170, 91060, 28297, 6087, 7083, 15000, 14579, 13498, 9368, 67451, 20406, 26928, 36551, 15728, 10857, 58595, 13482, 66666, 29568, 32200, 14025, 18073, 35790, 14715, 10047, 15429, 30959, 21074, 15642, 19071, 15552, 16478, 13416, 12699, 13182, 7335, 17462, 15828, 333633, 121274, 45286, 143304, 26193, 33236, 44595, 84151, 19376, 41786, 52003, 10990, 99752, 25147, 44195, 62755, 81986, 37412, 37880, 12923, 26224, 15790, 15108, 9073, 10423, 12763, 4763, 6592, 30223, 41510, 11490, 9262, 5750, 5647, 6954, 11841, 9905, 9377, 13961, 34484, 10659, 9485, 15942, 13242, 11110, 564039, 66121, 44110, 14621, 55763, 13218, 39151, 58238, 40390, 111026, 24296, 12711, 24290, 39506, 54975, 9093, 33077, 11910, 8618, 11890, 4123, 16174, 3763, 11509, 9011, 9948, 91120, 24650, 10783, 11782, 26060, 15727, 7868, 15932, 9668, 7109, 150291, 21506, 11175, 10747, 23613, 4431, 8603, 15998, 150134, 22631, 26116, 13934, 6837, 10114, 10241, 15640, 6887, 7068, 10894, 58340, 51964, 11160, 15566, 23256, 26992, 5896, 9660, 11609, 9481, 19028, 100603, 39259, 25782, 26918, 37401, 9480, 18030, 25190, 98810, 18610, 19709, 56139, 5444, 6501, 14925, 11791, 11268, 7122, 10154, 62601, 7103, 2451, 5412, 6784, 4086, 3133, 5902, 2516, 2646, 8776, 6787, 2809, 125080, 12257, 72723, 6440, 2821, 5081, 3367, 16169, 6101, 17825, 8274, 77470, 42184, 28181, 9805, 23116]
        var apartment_cost = [1073, 1153, 1144, 1071, 1144, 1043, 971, 1094, 1088, 1201, 1293, 1254, 1066, 1309, 1172, 1251, 1165, 1257, 1182, 1147, 1123, 1141, 958, 1159, 964, 1028, 1185, 1093, 1031, 968, 1059, 1033, 932, 890, 979, 985, 979, 834, 866, 907, 807, 871, 922, 901, 1068, 1065, 976, 862, 933, 898, 856, 963, 1026, 953, 897, 919, 852, 903, 860, 909, 820, 884, 874, 880, 928, 832, 956, 923, 853, 919, 1005, 772, 909, 797, 1028, 812, 966, 879, 871, 918, 1053, 882, 1070, 915, 979, 953, 1034, 1120, 864, 913, 960, 951, 1069, 981, 967, 1067, 1011, 927, 834, 896, 848, 927, 977, 1173, 1102, 1026, 1134, 1011, 1094, 948, 998, 1022, 1040, 893, 951, 1072, 1000, 973, 954, 1036, 1022, 1007, 1003, 1094, 1062, 985, 1007, 918, 1083, 933, 902, 1025, 1111, 906, 1095, 794, 830, 897, 868, 876, 858, 956, 984, 967, 814, 886, 888, 798, 1116, 1100, 1021, 964, 930, 1006, 969, 975, 1013, 1011, 908, 978, 914, 905, 957, 825, 880, 1032, 923, 877, 859, 983, 785, 881, 948, 870, 1017, 896, 873, 869, 945, 865, 966, 963, 870, 976, 1012, 954, 884, 965, 934, 785, 911, 945, 1058, 964, 977, 909, 846, 879, 903, 940, 901, 891, 886, 1005, 958, 932, 952, 851, 925, 940, 925, 862, 880, 925, 949, 983, 980, 907, 981, 805, 990, 950, 997, 892, 850, 977, 831, 821, 865, 862, 1055, 871, 918, 938, 797, 760, 806, 802, 762, 719, 789, 737, 812, 828, 834, 814, 1020, 870, 941, 895, 920, 878, 795, 899, 894, 926, 803, 926, 915, 901, 971, 937];
        var cities = ['Mellerud', 'Bengtsfors', 'Botkyrka', 'Salem', 'Bräcke', 'Ekerö', 'Trosa', 'Huddinge', 'Svalöv', 'Ragunda', 'Järfälla', 'Sorsele', 'Eskilstuna', 'Storuman', 'Tranemo', 'Krokom', 'Burlöv', 'Töreboda', 'Staffanstorp', 'Tibro', 'Enköping', 'Götene', 'Älvsbyn', 'Nykvarn', 'Östhammar', 'Vara', 'Uppsala', 'Tyresö', 'Upplands-Bro', 'Haninge', 'Herrljunga', 'Strömsund', 'Svenljunga', 'Mark', 'Surahammar', 'Skinnskatteberg', 'Lysekil', 'Kungälv', 'Mölndal', 'Högsby', 'Berg', 'Vellinge', 'Åre', 'Sollentuna', 'Skara', 'Åsele', 'Kiruna', 'Lidköping', 'Vilhelmina', 'Haparanda', 'Boden', 'Åmål', 'Vännäs', 'Piteå', 'Luleå', 'Täby', 'Borås', 'Alingsås', 'Trollhättan', 'Vänersborg', 'Strömstad', 'Uddevalla', 'Torsås', 'Skurup', 'Svedala', 'Kungsbacka', 'Lomma', 'Varberg', 'Kävlinge', 'Falkenberg', 'Bjuv', 'Laholm', 'Halmstad', 'Mörbylånga', 'Örkelljunga', 'Falköping', 'Hofors', 'Östra Göinge', 'Tidaholm', 'Hjo', 'Skövde', 'Ockelbo', 'Aneby', 'Lekeberg', 'Perstorp', 'Lidingö', 'Ovanåker', 'Osby', 'Bromölla', 'Härjedalen', 'Skellefteå', 'Södertälje', 'Lycksele', 'Nacka', 'Umeå', 'Stockholm', 'Höör', 'Hörby', 'Sjöbo', 'Gnosjö', 'Ystad', 'Eslöv', 'Nordanstig', 'Höganäs', 'Helsingborg', 'Landskrona', 'Lund', 'Malmö', 'Sigtuna', 'Emmaboda', 'Hultsfred', 'Båstad', 'Vaxholm', 'Åstorp', 'Norrtälje', 'Gotland', 'Klippan', 'Ödeshög', 'Kil', 'Malung-Sälen', 'Vansbro', 'Timrå', 'Hässleholm', 'Ängelholm', 'Ånge', 'Simrishamn', 'Östersund', 'Kristianstad', 'Ydre', 'Kinda', 'Norberg', 'Hallstahammar', 'Kungsör', 'Trelleborg', 'Orsa', 'Rättvik', 'Olofström', 'Älmhult', 'Mullsjö', 'Tingsryd', 'Leksand', 'Habo', 'Alvesta', 'Borgholm', 'Lessebo', 'Oskarshamn', 'Eda', 'Västervik', 'Gagnef', 'Kalmar', 'Nybro', 'Torsby', 'Markaryd', 'Växjö', 'Örnsköldsvik', 'Sollefteå', 'Ljusdal', 'Kramfors', 'Sundsvall', 'Härnösand', 'Ljusnarsberg', 'Hällefors', 'Arboga', 'Älvdalen', 'Köping', 'Hallsberg', 'Laxå', 'Sala', 'Västerås', 'Karlskrona', 'Örebro', 'Sölvesborg', 'Karlshamn', 'Ronneby', 'Vaggeryd', 'Gislaved', 'Vingåker', 'Håbo', 'Gävle', 'Jönköping', 'Boxholm', 'Hudiksvall', 'Mora', 'Smedjebacken', 'Söderhamn', 'Sandviken', 'Partille', 'Årjäng', 'Härryda', 'Lindesberg', 'Forshaga', 'Nora', 'Karlskoga', 'Hammarö', 'Storfors', 'Kumla', 'Öckerö', 'Kristinehamn', 'Karlstad', 'Stenungsund', 'Eksjö', 'Tranås', 'Sävsjö', 'Vetlanda', 'Åtvidaberg', 'Finspång', 'Värnamo', 'Tjörn', 'Arjeplog', 'Arvidsjaur', 'Borlänge', 'Falun', 'Norrköping', 'Gnesta', 'Söderköping', 'Linköping', 'Ludvika', 'Avesta', 'Hedemora', 'Säter', 'Kalix', 'Överkalix', 'Säffle', 'Orust', 'Arvika', 'Jokkmokk', 'Knivsta', 'Hagfors', 'Heby', 'Filipstad', 'Övertorneå', 'Sotenäs', 'Ale', 'Hylte', 'Vindeln', 'Tanum', 'Bjurholm', 'Gällivare', 'Nordmaling', 'Mjölby', 'Pajala', 'Motala', 'Vadstena', 'Munkedal', 'Robertsfors', 'Färgelanda', 'Dals-Ed', 'Flen', 'Värmdö', 'Katrineholm', 'Nyköping', 'Tierp', 'Oxelösund', 'Österåker', 'Gullspång', 'Upplands Väsby', 'Vallentuna', 'Essunga', 'Grästorp', 'Bollebygd', 'Vårgårda', 'Lerum', 'Malå', 'Norsjö'];

        const X_MAX_VALUE = Math.max(...salary);
        const Y_MAX_VALUE = Math.max(...population);
        const Z_MAX_VALUE = Math.max(...apartment_cost);

        const X_MIN_VALUE = Math.min(...salary);
        const Y_MIN_VALUE = Math.min(...population);
        const Z_MIN_VALUE = Math.min(...apartment_cost);

        this.createBase();
        
        var offsets = [X_MIN_VALUE, Y_MIN_VALUE, Z_MIN_VALUE];

        this.createSpheres(salary, population, apartment_cost, cities, offsets);
        this.createGrid(X_MIN_VALUE, Y_MIN_VALUE, Z_MIN_VALUE, X_MAX_VALUE, Y_MAX_VALUE, Z_MAX_VALUE); 

        setTitle(this.el, data.title, data.size, data.size, data.size);
    },

    createBase: function() {
        var base = document.createElement("a-box");
        base.setAttribute('width', this.data.size);
        base.setAttribute('height', 0.0001);
        base.setAttribute('depth', this.data.size);
        base.setAttribute('color', '#0000FF');
        base.setAttribute('transparent', 'true');
        base.setAttribute('opacity', '0.1');

        var pos = {x: -this.data.size / 2, y: this.data.size / 2, z: this.data.size / 1.4};
        this.createLabel(pos, "Population", "0 90 90", "center", base, "true");

        var pos2 = {x: 0, y: 0, z: this.data.size / 1.4};
        this.createLabel(pos2, "Median salary per year (/1000SEK)", "-90 -90 90", "center", base, "true");

        var pos3 = {x: this.data.size / 1.3, y: 0, z: 0};
        this.createLabel(pos3, "Median rent (SEK)", "-90 90 0", "center", base, "true");

        this.el.appendChild(base);
    },

    createGrid: function(xMin, yMin, zMin, xMax, yMax, zMax) {
        const NBR_OF_LINES = 10;
        var w = this.data.size / 2;
        var h = this.data.size;
        // Bottom 
        var blb = new THREE.Vector3(-w, 0, -w)
        var brb = new THREE.Vector3(w, 0, -w);
        var brt = new THREE.Vector3(w, 0, w);
        var blt = new THREE.Vector3(-w, 0, w);

        // Top
        var tlb = new THREE.Vector3(-w, h, -w);
        var trb = new THREE.Vector3(w, h, -w);
        var trt = new THREE.Vector3(w, h, w);
        var tlt = new THREE.Vector3(-w, h, w);

        var count = 1;
        var lineStep = this.data.size / NBR_OF_LINES;

        var lines = document.createElement('a-entity');
        this.createRow(blb, brb, NBR_OF_LINES, lineStep, 'y', lines, count);
        this.createRow(brb, trb, NBR_OF_LINES, -lineStep, 'x', lines, count);
        this.createRow(blb, blt, NBR_OF_LINES, lineStep, 'y', lines, count);
        this.createRow(blb, tlb, NBR_OF_LINES, lineStep, 'z', lines, count);
        this.createRow(blb, blt, NBR_OF_LINES, lineStep, 'x', lines, count);
        this.createRow(blb, brb, NBR_OF_LINES, lineStep, 'z', lines, count);

        this.createAxisLabels(brt, "-90 90 0", NBR_OF_LINES, xMin, xMax, 'x', 'right', -lineStep, lines);
        this.createAxisLabels(brt, "-90 0 0", NBR_OF_LINES, zMin, zMax, 'z', 'left', -lineStep, lines);
        this.createAxisLabels(blt, "0 90 0", NBR_OF_LINES, yMin, yMax, 'y', 'right', lineStep, lines);

        this.el.childNodes[0].appendChild(lines);
    },

    createLine(v1, v2, lines, count){
        var line = document.createElement('a-entity');
        line.setAttribute("line__" + count, "start:" + v1.x + " " + v1.y + " " + v1.z + "; end:" + v2.x + " " + v2.y + " " + v2.z + "; color: black");
        lines.appendChild(line);
    },

    // +- linestep to choose direction 
    createRow(v1, v2, iterations, lineStep, axis, lines, count) {
        var t1 = new THREE.Vector3(v1.x, v1.y, v1.z);
        var t2 = new THREE.Vector3(v2.x, v2.y, v2.z);
        for (var i = 0; i <= iterations; i++) {
        this.createLine(t1, t2, lines, count);
            if (axis === 'x') {
                t1.x += lineStep; 
                t2.x += lineStep;
            } else if (axis === 'y') {
                t1.y += lineStep; 
                t2.y += lineStep;
            } else {
                t1.z += lineStep; 
                t2.z += lineStep;
            }
        }
    },

    createAxisLabels: function(v1, rotation, iterations, startValue, endValue, axis, align, lineStep, lines) {
        var t1 = new THREE.Vector3(v1.x, v1.y, v1.z);
        var valueStep = (endValue - startValue) / iterations;
        for (var i = 0; i <= iterations; i++) {
            this.createLabel(t1, valueStep * i, rotation, align, lines, "true");
            if (axis === 'x') {
                t1.x += lineStep; 
            } else if (axis === 'y') {
                t1.y += lineStep; 
            } else {
                t1.z += lineStep; 
            }
        }
    },

    createLabel: function(position, value, rotation, align, parent, visible) {
        var label = document.createElement("a-text");
        label.setAttribute("width", this.data.size / 1.2);
        if (typeof value === 'string' || value instanceof String) {
            label.setAttribute("value", value);
        } else {
            label.setAttribute("value", Math.abs(Math.floor(value)));
        }
        label.setAttribute("rotation", rotation);
        label.setAttribute("align", align)
        label.setAttribute("color", "#000000");
        label.setAttribute('side', 'double');
        label.setAttribute("position", {
            x: position.x, y: position.y, z: position.z
        });
        label.setAttribute("visible", visible);
        
        parent.appendChild(label);
    },

    createSphere: function(x, y, z, value) {
        var sphere = document.createElement("a-sphere");
        sphere.setAttribute('radius', this.data.radius);

        var colors = ["#F6903D", "#F6903D", "#F6903D", "#F05053", "#F05053"]

        sphere.setAttribute('color', colors[Math.floor(y / this.data.size * 5)]);

        sphere.setAttribute("hoverable","");
        sphere.setAttribute("bar-listener","");
        
        sphere.setAttribute('position', {
            x: x - this.data.size / 2, y: y, z: z - this.data.size / 2
        });

        var textPos = new THREE.Vector3(0, this.data.radius * 2, 0);
        this.createLabel(textPos, value, "0 0 0", "center", sphere, "false");

        this.el.childNodes[0].appendChild(sphere);
    },

    createSpheres: function(xArr, yArr, zArr, nameArr, offsets) {
        const NBR_OF_DATA_POINTS = xArr.length;

        this.scaleValues(1.0, xArr);
        this.scaleValues(1.0, yArr);
        this.scaleValues(1.0, zArr);
        this.scaleValues(1.0, offsets);

        var scale = 3;

        for (var i = 0; i < NBR_OF_DATA_POINTS; i++) {
            // Reversing x- and z values
            this.createSphere(this.data.size - xArr[i], yArr[i], this.data.size - zArr[i], nameArr[i]);
        }
    },

    scaleValues: function(target, values) {
        const MAX = Math.max(...values);
        const DIVIDER = this.data.size / MAX;

        for (var i = 0; i < values.length; i++) {
            values[i] = (values[i] * DIVIDER);
        }
    },
});