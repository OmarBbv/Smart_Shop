export interface TemplateProps {
    selectedCategory: 'Mobil telefonlar' | 'Foto və videokameralar' | 'Kompüter, noutbuk və planşetlər' | 'Noutbuk və netbuklar' | 'SSD diskləri'
    | 'Dinamiklər və kolonkalar' | 'Səs gücləndiriciləri' | 'Musiqi mərkəzləri' | 'Maqnitofonlar' | 'Diktofonlar' | 'Mikrofonlar' | 'Minidisk və disk pleyerlər'
    | 'Digər auditexnika' | 'iPod və MP3 pleyerlər' | 'Qulaqcıqlar' | 'Radio' | 'Karaoke' | 'Videokameralar' | 'Fotokameralar' | 'Yaddaş kartları'
    | 'Obyektivlər və filtrləri' | 'Çanta və çexollar' | 'İşıqlandırma' | 'Enerji qurğuları' | 'Obyektivlər və filtrləri' | 'Kabellər və adapterlər'
    | 'Digər foto və video aksesuarları' | 'Videomüşahidə' | 'Korpuslar' | 'Digər ehtiyat hissələri' | 'Skanerlər' | 'Prosessorlar' | 'Qida blokları'
    | 'Videokartlar' | 'Ana platalar' | 'Printerlər' | 'Elektron kitablar'
    ;
}

export default function Template({ selectedCategory }: TemplateProps) {
    switch (selectedCategory) {
        case 'Mobil telefonlar':
            return (
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                    {/* Model */}
                    <div>
                        <label className="block font-semibold">Model</label>
                        <input type="text" className="w-full border rounded p-2" />
                    </div>

                    {/* Vəziyyəti */}
                    <div>
                        <label className="block font-semibold">Vəziyyəti</label>
                        <input type="text" className="w-full border rounded p-2" />
                    </div>

                    {/* Yaddaş tutumu */}
                    <div>
                        <label className="block font-semibold">Yaddaş tutumu</label>
                        <input type="text" className="w-full border rounded p-2" placeholder="məs: 128 GB" />
                    </div>

                    {/* Operativ yaddaş */}
                    <div>
                        <label className="block font-semibold">Operativ yaddaş, RAM (GB)</label>
                        <input type="text" className="w-full border rounded p-2" placeholder="məs: 6 GB" />
                    </div>

                    {/* Rəng */}
                    <div>
                        <label className="block font-semibold">Rəng</label>
                        <input type="text" className="w-full border rounded p-2" />
                    </div>

                    {/* Çatdırılma */}
                    <div>
                        <label className="block font-semibold">Çatdırılma</label>
                        <input type="text" className="w-full border rounded p-2" />
                    </div>

                    {/* Əlavə olaraq */}
                    <div className="col-span-2">
                        <label className="block font-semibold">Əlavə olaraq</label>
                        <input type="text" className="w-full border rounded p-2" />
                    </div>
                </div>
            );
        case "Foto və videokameralar":
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                {/* Vəziyyəti */}
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case "Kompüter, noutbuk və planşetlər":
        case 'Noutbuk və netbuklar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Nüvələrinin sayı</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Rəng</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Operativ yaddaşı (GB)</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Prosessoru</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Təyinatı</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Displeyi (düym)</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Yığıcı növü</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Kompüterin növü</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">ƏS</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Videokartı</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Yaddaş növü</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

            </div>
        case 'SSD diskləri':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Yaddaş</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Standart</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Növ</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Zəmanət</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Kredit</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Dinamiklər və kolonkalar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Kolonka növü*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Rəng</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Kanalların sayı</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Səs gücləndiriciləri':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case "Musiqi mərkəzləri":
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Maqnitofonlar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Maqnitofon növü *</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Diktofonlar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Mikrofonlar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Qoşulma növü*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

            </div>
        case 'Minidisk və disk pleyerlər':
        case 'Digər auditexnika':
        case 'iPod və MP3 pleyerlər':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Qulaqcıqlar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Qoşulma növü*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Növü</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Rəng</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Konstruksiyasının növü</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Təyinatı</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Radio':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Karaoke':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Videokameralar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Fotokameralar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Yaddaş kartları':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Obyektivlər və filtrləri':
        case 'Çanta və çexollar':
        case 'İşıqlandırma':
        case 'Enerji qurğuları':
        case 'Obyektivlər və filtrləri':
        case 'Kabellər və adapterlər':
        case 'Digər foto və video aksesuarları':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Videomüşahidə':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>

        // Kompüter ehtiyyat hissələri
        case 'Korpuslar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Brend *</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Rəng</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Zəmanət</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Digər ehtiyat hissələri':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Zəmanət</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Skanerlər':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Zəmanət</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Prosessorlar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Seriya*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Model*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Tezlik</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Nüvələrin sayı</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Zəmanət</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Kredit</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Qida blokları':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Brend*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Güc*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Zəmanət</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Videokartlar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Brend*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Qrafik prosessor*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Yaddaş*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Zəmanət</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Kredit</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

            </div>
        case 'Ana platalar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Brend*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Model*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Model*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Zəmanət</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

            </div>
        case 'Printerlər':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Vəziyyəti*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Rəng</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Elektron kitablar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Brend*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Rəng</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Ekranın diaqonalı (düym)</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Əlaqə</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
    }
}
